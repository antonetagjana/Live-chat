import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import { getMessagesByConversationId, sendMessage as sendMessageApi } from '../apiClients/messages';
import useMqtt from '../hooks/usemqtt';

function ChatRoom({ roomId, userId, userName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { messages: mqttMessages } = useMqtt(roomId);

  // Fetch historical messages once
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

  // Handle incoming MQTT messages
  useEffect(() => {
    mqttMessages.forEach((incoming) => {
      setMessages((prevMessages) => {
        const exists = prevMessages.some((msg) => msg.id === incoming.id);
        if (exists) return prevMessages;
        return [...prevMessages, incoming];
      });
    });
  }, [mqttMessages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: `temp-${Date.now()}`, // temporary ID to avoid duplication
      conversationId: roomId,
      senderId: userId,
      senderName: userName,
      content: input
    };

    try {
      await sendMessageApi(newMessage);
      setMessages((prev) => [...prev, { ...newMessage, senderName: 'You' }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatroom-container">
      <h2>{userName}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="message">
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
