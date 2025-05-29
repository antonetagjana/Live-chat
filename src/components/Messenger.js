import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ChatRoom from './ChatRoom';
import './Messenger.css';

const Messenger = () => {
  const [activeRoomId, setActiveRoomId] = useState(null);
  const userId = '1'; // Replace with actual logged-in user ID

  return (
    <div className="messenger-container">
      <div className="sidebar">
        <ConversationList onSelectRoom={setActiveRoomId} />
      </div>
      <div className="chat-area">
        {activeRoomId ? (
          <ChatRoom roomId={activeRoomId} userId={userId} />
        ) : (
          <div className="no-chat">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
