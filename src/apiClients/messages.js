// src/messages.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getMessagesByConversationId = async (conversationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/messages/conversation/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching messages for conversation ${conversationId}:`, error);
    throw error;
  }
};


export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${BASE_URL}/messages/send`, message);
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};