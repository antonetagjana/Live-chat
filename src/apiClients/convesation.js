// conversation.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/conversations/2';

export const getConversations = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};
