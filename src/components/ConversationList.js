// src/components/ConversationList.js
import React, { useEffect, useState } from 'react';
import './ConversationList.css';

function ConversationList({ onSelectRoom }) {
  const [conversations, setConversations] = useState([]);

  
  useEffect(() => {
    const dummyData = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Charlie' }
    ];
    setConversations(dummyData);
  }, []);

  const handleClick = (userId) => {
    onSelectRoom(userId); 
  };

  return (
    <div className="conversation-container">
      <h2>Your Conversations</h2>
      <ul className="conversation-list">
        {conversations.map((conv) => (
          <li key={conv.id} onClick={() => handleClick(conv.id)}>
            {conv.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
