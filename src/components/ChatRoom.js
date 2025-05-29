// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import { getMessagesByConversationId } from '../apiClients/messages';

function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByConversationId(roomId);
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      senderId: userId,
      senderName: 'You',
      content: input
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="chatroom-container">
      <h2>Conversation ID: {roomId}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.senderId === userId ? 'You' : msg.senderName}:</strong> {msg.content}
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
