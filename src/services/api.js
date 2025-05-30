// src/services/api.js

import axios from 'axios';

export const loginUser = async (identifier, password) => {
  try {
    const response = await axios.post('https://d1e3-31-22-48-158.ngrok-free.app/login', {
      identifier,  
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

