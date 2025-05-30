import React, { useState, useEffect } from 'react';
import './ChatRoom.css';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  
  const user = JSON.parse(localStorage.getItem('user'));
  
  const BASE_URL = "https://0fbf-46-183-121-56.ngrok-free.app";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        
        const response = await fetch(`${BASE_URL}/conversations/${roomId}/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    if (roomId) fetchMessages();
  }, [roomId]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const message = {
      conversationId: roomId,
      senderId: user.id,          
      senderName: user.firstName, 
      content: input,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });

      const savedMessage = await response.json();
      setMessages((prev) => [...prev, savedMessage]);
      setInput('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div className="chatroom-container">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.senderName || 'You'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-btn">Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
