import React, { useState } from 'react';
import { ChatRoom } from '../components/chat/ChatRoom';
import { ChatRoomList } from '../components/chat/ChatRoomList';
import { ChatRoom as ChatRoomType } from '../services/messageService';

export const ChatPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);

  return (
    <div className="flex h-screen">
      {/* 채팅방 목록 */}
      <div className="w-80 border-r">
        <ChatRoomList
          onSelectRoom={setSelectedRoom}
          selectedRoomId={selectedRoom?.id}
        />
      </div>

      {/* 채팅방 */}
      <div className="flex-1">
        {selectedRoom ? (
          <ChatRoom room={selectedRoom} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            채팅방을 선택하세요
          </div>
        )}
      </div>
    </div>
  );
}; 