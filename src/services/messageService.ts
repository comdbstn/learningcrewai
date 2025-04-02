import { supabase, supabaseLogger } from '../lib/supabase';

// 채팅방 타입 정의
export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'learning_group';
  created_at?: string;
  created_by?: string;
}

// 메시지 타입 정의
export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  attachments?: { url: string; type: string; name: string }[];
  created_at?: string;
  updated_at?: string;
  user?: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

/**
 * 채팅방 목록 조회
 * @param userId 사용자 ID
 * @returns 사용자가 참여 중인 채팅방 목록
 */
export const getChatRooms = async (userId: string): Promise<ChatRoom[]> => {
  try {
    supabaseLogger.log('채팅방 목록 조회 시작', { userId });
    
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        chat_room_members!inner(user_id)
      `)
      .eq('chat_room_members.user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) {
      supabaseLogger.error('채팅방 목록 조회 실패', error);
      throw error;
    }
    
    supabaseLogger.log('채팅방 목록 조회 성공', { count: data.length });
    return data as ChatRoom[];
  } catch (error) {
    supabaseLogger.error('채팅방 목록 조회 중 오류 발생', error);
    throw error;
  }
};

/**
 * 채팅방 생성
 * @param userId 사용자 ID (채팅방 생성자)
 * @param roomData 채팅방 정보
 * @param memberIds 초대할 멤버 ID 배열
 * @returns 생성된 채팅방 정보
 */
export const createChatRoom = async (
  userId: string, 
  roomData: Partial<ChatRoom>, 
  memberIds: string[]
): Promise<ChatRoom> => {
  try {
    supabaseLogger.log('채팅방 생성 시작', { userId, roomData, memberIds });
    
    // 트랜잭션으로 채팅방 생성 및 멤버 추가
    const { data, error } = await supabase.rpc('create_chat_room', {
      creator_id: userId,
      room_name: roomData.name,
      room_type: roomData.type || 'group',
      member_ids: [...new Set([...memberIds, userId])] // 중복 제거 및 생성자 추가
    });
    
    if (error) {
      supabaseLogger.error('채팅방 생성 실패', error);
      throw error;
    }
    
    supabaseLogger.log('채팅방 생성 성공', { chatRoomId: data.id });
    return data as ChatRoom;
  } catch (error) {
    supabaseLogger.error('채팅방 생성 중 오류 발생', error);
    throw error;
  }
};

/**
 * 1:1 채팅방 찾기 또는 생성
 * @param userId 요청한 사용자 ID
 * @param otherUserId 상대방 사용자 ID
 * @returns 채팅방 정보
 */
export const findOrCreateDirectChatRoom = async (userId: string, otherUserId: string): Promise<ChatRoom> => {
  try {
    supabaseLogger.log('1:1 채팅방 찾기 시작', { userId, otherUserId });
    
    // 기존 1:1 채팅방 찾기
    const { data: existingRooms, error: findError } = await supabase.rpc('find_direct_chat_room', {
      user_id_1: userId,
      user_id_2: otherUserId
    });
    
    if (findError) {
      supabaseLogger.error('채팅방 찾기 실패', findError);
      throw findError;
    }
    
    // 기존 채팅방이 있으면 반환
    if (existingRooms && existingRooms.length > 0) {
      supabaseLogger.log('기존 1:1 채팅방 발견', { roomId: existingRooms[0].id });
      return existingRooms[0] as ChatRoom;
    }
    
    // 없으면 새로 생성
    const { data: otherUser } = await supabase
      .from('users')
      .select('name')
      .eq('id', otherUserId)
      .single();
    
    const roomName = `${otherUser?.name || '사용자'}와의 대화`;
    
    return createChatRoom(userId, {
      name: roomName,
      type: 'direct'
    }, [otherUserId]);
  } catch (error) {
    supabaseLogger.error('1:1 채팅방 찾기/생성 중 오류 발생', error);
    throw error;
  }
};

/**
 * 채팅방 메시지 목록 조회
 * @param roomId 채팅방 ID
 * @param limit 조회할 메시지 수
 * @param before 특정 시간 이전 메시지만 조회 (페이징용)
 * @returns 메시지 목록
 */
export const getChatMessages = async (
  roomId: string, 
  limit: number = 50, 
  before?: string
): Promise<Message[]> => {
  try {
    supabaseLogger.log('채팅 메시지 조회 시작', { roomId, limit, before });
    
    let query = supabase
      .from('messages')
      .select(`
        *,
        user:users(id, name, avatar_url)
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (before) {
      query = query.lt('created_at', before);
    }
    
    const { data, error } = await query;
    
    if (error) {
      supabaseLogger.error('채팅 메시지 조회 실패', error);
      throw error;
    }
    
    const messages = data as Message[];
    
    supabaseLogger.log('채팅 메시지 조회 성공', { count: messages.length });
    // 시간순 정렬 (오래된 것부터)
    return messages.reverse();
  } catch (error) {
    supabaseLogger.error('채팅 메시지 조회 중 오류 발생', error);
    throw error;
  }
};

/**
 * 메시지 전송
 * @param roomId 채팅방 ID
 * @param userId 발신자 ID
 * @param content 메시지 내용
 * @param attachments 첨부 파일 정보 (선택사항)
 * @returns 전송된 메시지 정보
 */
export const sendMessage = async (
  roomId: string, 
  userId: string, 
  content: string, 
  attachments?: { url: string; type: string; name: string }[]
): Promise<Message> => {
  try {
    supabaseLogger.log('메시지 전송 시작', { roomId, userId });
    
    const messageData = {
      room_id: roomId,
      user_id: userId,
      content,
      attachments,
      created_at: new Date().toISOString()
    };
    
    // 메시지 저장
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select(`
        *,
        user:users(id, name, avatar_url)
      `)
      .single();
    
    if (error) {
      supabaseLogger.error('메시지 전송 실패', error);
      throw error;
    }
    
    // 채팅방 업데이트 시간 갱신
    await supabase
      .from('chat_rooms')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', roomId);
    
    supabaseLogger.log('메시지 전송 성공', { messageId: data.id });
    return data as Message;
  } catch (error) {
    supabaseLogger.error('메시지 전송 중 오류 발생', error);
    throw error;
  }
};

/**
 * 메시지 삭제
 * @param messageId 메시지 ID
 * @param userId 요청한 사용자 ID (자신의 메시지만 삭제 가능)
 * @returns 성공 여부
 */
export const deleteMessage = async (messageId: string, userId: string): Promise<boolean> => {
  try {
    supabaseLogger.log('메시지 삭제 시작', { messageId, userId });
    
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId)
      .eq('user_id', userId); // 자신의 메시지만 삭제 가능
    
    if (error) {
      supabaseLogger.error('메시지 삭제 실패', error);
      throw error;
    }
    
    supabaseLogger.log('메시지 삭제 성공');
    return true;
  } catch (error) {
    supabaseLogger.error('메시지 삭제 중 오류 발생', error);
    throw error;
  }
}; 