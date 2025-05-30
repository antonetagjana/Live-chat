import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ChatRoom from './ChatRoom';
import './Messenger.css';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setUserId(user.id);

      fetch('https://0fbf-46-183-121-56.ngrok-free.app/conversations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setConversations(data))
        .catch((err) => console.error('Error fetching conversations:', err));
    }
  }, []);

  return (
    <div className="messenger-container">
      <div className="sidebar">
        <ConversationList 
          conversations={conversations} 
          onSelectRoom={setActiveRoomId}
        />
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
