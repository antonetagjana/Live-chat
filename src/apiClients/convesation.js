// conversation.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/conversations';

export const getConversationById = async (id) => {
  const url = `${API_URL}/${id}`;
  try {
    console.log(`Making GET request to: ${url}`);
    const response = await axios.get(url);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching conversation with ID ${id}:`, error);
    throw error;
  }
};
