import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ChatRoom from './ChatRoom';
import './Messenger.css';

const Messenger = () => {
  const [activeRoomId, setActiveRoomId] = useState(null);

  return (
    <div className="messenger-container">
      <div className="sidebar">
        <ConversationList onSelectRoom={setActiveRoomId} />
      </div>
      <div className="chat-area">
        {activeRoomId ? (
          <ChatRoom roomId={activeRoomId} />
        ) : (
          <div className="no-chat">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
