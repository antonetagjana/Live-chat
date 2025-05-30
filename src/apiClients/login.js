import axios from 'axios';

const login = async (identifier, password) => {
  try {
    const response = await axios.post('https://645e-185-156-14-12.ngrok-free.app/login', {
      identifier,
      password
    });

    // Store the user details in localStorage
    const userData = response.data;
    localStorage.setItem('user', JSON.stringify(userData));

    console.log('Login successful:', userData);
    return userData;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export default login;
