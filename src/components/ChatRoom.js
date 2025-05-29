// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import './ChatRoom.css';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  
  const users = {
    '1': 'Alice',
    '2': 'Bob',
    '3': 'Charlie'
  };

  const recipientName = users[roomId] || 'Unknown User';

  
  useEffect(() => {
    const dummyMessages = [
      { sender: recipientName, content: 'Hello!' },
      { sender: 'You', content: 'Hi there!' }
    ];
    setMessages(dummyMessages);
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      sender: 'You',
      content: input
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="chatroom-container">
      <h2>Chat with {recipientName}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}:</strong> {msg.content}
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
