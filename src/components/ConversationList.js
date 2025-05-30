import React from 'react';
import './ConversationList.css';

function ConversationList({ conversations, onSelectRoom }) {
  const handleClick = (conversationId) => {
    onSelectRoom(conversationId);
  };

  return (
    <div className="conversation-container">
      <h2>Your Conversations</h2>
      <ul className="conversation-list">
        {conversations && conversations.length > 0 ? (
          conversations.map((conv) => (
            <li key={conv._id} onClick={() => handleClick(conv._id)}>
              {conv.participants?.map(p => p.username).join(', ')}
            </li>
          ))
        ) : (
          <li>No conversations available</li>
        )}
      </ul>
    </div>
  );
}

export default ConversationList;
