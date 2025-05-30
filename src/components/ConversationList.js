import React, { useEffect, useState } from 'react';
import './ConversationList.css';
import { getConversations } from '../apiClients/convesation';

function ConversationList({ onSelectRoom, currentUserId }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations();

        // Process each conversation and decide which name to show
        const processed = data.map((conv) => {
          const nameToShow = conv.userId === currentUserId ? conv.senderName : conv.userName;
          return {
            ...conv,
            displayName: nameToShow,
          };
        });

        setConversations(processed);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
  }, [currentUserId]);

  const handleClick = (userId) => {
    onSelectRoom(userId); 
  };

  return (
    <div className="conversation-container">
      <h2>Your Conversations</h2>
      <ul className="conversation-list">
        {conversations.map((conv) => (
          <li key={conv.id} onClick={() => handleClick(conv.id)}>
            {conv.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
