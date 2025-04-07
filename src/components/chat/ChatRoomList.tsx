import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChatRoom as ChatRoomType, getChatRooms, findOrCreateDirectChatRoom } from '../../services/messageService';
import { supabase } from '../../lib/supabase';

interface ChatRoomListProps {
  onSelectRoom: (room: ChatRoomType) => void;
  selectedRoomId?: string;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({
  onSelectRoom,
  selectedRoomId,
}) => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 채팅방 목록 로드
  useEffect(() => {
    const loadRooms = async () => {
      if (!user) return;

      try {
        const loadedRooms = await getChatRooms(user.id);
        setRooms(loadedRooms);
      } catch (error) {
        console.error('채팅방 목록 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [user]);

  // 실시간 채팅방 업데이트 구독
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('chat_rooms')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_rooms',
        },
        async (payload) => {
          // 채팅방 목록 새로고침
          const updatedRooms = await getChatRooms(user.id);
          setRooms(updatedRooms);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // 1:1 채팅 시작
  const handleStartDirectChat = async (userId: string) => {
    if (!user) return;

    try {
      const room = await findOrCreateDirectChatRoom(user.id, userId);
      onSelectRoom(room);
    } catch (error) {
      console.error('1:1 채팅 시작 실패:', error);
    }
  };

  // 채팅방 검색
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* 검색창 */}
      <div className="p-4 border-b">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="채팅방 검색..."
          className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 채팅방 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedRoomId === room.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{room.name}</h3>
                <p className="text-sm text-gray-500">
                  {room.type === 'direct'
                    ? '1:1 채팅'
                    : room.type === 'group'
                    ? '그룹 채팅'
                    : '학습 그룹 채팅'}
                </p>
              </div>
              {room.updated_at && (
                <span className="text-xs text-gray-400">
                  {new Date(room.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 새 채팅 시작 버튼 */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            // TODO: 사용자 선택 모달 구현
            console.log('새 채팅 시작');
          }}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          새 채팅 시작
        </button>
      </div>
    </div>
  );
}; 