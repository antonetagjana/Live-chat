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
