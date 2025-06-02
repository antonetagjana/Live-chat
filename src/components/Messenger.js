import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ChatRoom from './ChatRoom';
import './Messenger.css';
import { useUser } from '../context/userContext';

const Messenger = () => {

    const { user } = useUser();
    console.log("User data",user)

  const [activeRoomId, setActiveRoomId] = useState(null);
  const userId =  localStorage.getItem('userId'); // Replace with actual logged-in user ID
  //const storedUserId = localStorage.getItem('userId');


  return (
    <div className="messenger-container">
      <div className="sidebar">
        <ConversationList currentUserId= {userId} onSelectRoom={setActiveRoomId} />
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
