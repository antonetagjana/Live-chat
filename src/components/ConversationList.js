// src/components/ConversationList.js
import React, { useEffect, useState } from 'react';
import './ConversationList.css';
import { getConversations } from '../apiClients/convesation';

function ConversationList({ onSelectRoom }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations();
        setConversations(data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  const handleClick = (userId) => {
    onSelectRoom(userId); 
  };

  return (
    <div className="conversation-container">
      <h2>Your Conversations</h2>
      <ul className="conversation-list">
        {conversations.map((conv) => (
          <li key={conv.id} onClick={() => handleClick(conv.userId)}>
            {conv.userName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
