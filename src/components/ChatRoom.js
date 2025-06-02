import React, { useState, useEffect, useRef } from 'react';
import './ChatRoom.css';
import { getMessagesByConversationId, sendMessage as sendMessageApi } from '../apiClients/messages';
import useMqtt from '../hooks/usemqtt';

function ChatRoom({ roomId, userId, userName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { messages: mqttMessages } = useMqtt(roomId);
  const messagesEndRef = useRef(null); // Ref for the messages container

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

  // Handle incoming MQTT messages (deduplicated by ID)
  useEffect(() => {
    mqttMessages.forEach((incoming) => {
      setMessages((prevMessages) => {
        const exists = prevMessages.some((msg) => msg.id === incoming.id);
        if (exists) return prevMessages;
        return [...prevMessages, incoming];
      });
    });
  }, [mqttMessages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth', // Smooth scrolling
      });
    }
  }, [messages, mqttMessages]); // Trigger on messages or mqttMessages change

  // Send message without appending manually
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // unique temp ID
      conversationId: roomId,
      senderId: userId,
      senderName: userName,
      content: input,
    };

    try {
      await sendMessageApi(newMessage);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatroom-container">
      <h2>{userName}</h2>
      <div className="messages" ref={messagesEndRef}> {/* Attach ref to messages container */}
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