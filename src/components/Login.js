import React, { useState } from 'react';
import './Login.css';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import login from '../apiClients/login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const navigate = useNavigate(); // Initialize navigate

  const loginUser = async (e) => {
    e.preventDefault();

    try {
     const userData = await login(username, password);
        console.log('Login userData:', userData); // Debug API response
        localStorage.setItem('userId', JSON.stringify(userData.id)); // Store in localStorage
        setUser(userData);
        setError(null);
        navigate('/messenger'); // Navigate without reloading
        } catch (err) {
        setError('Login failed. Please check your credentials.');
        console.error(err);
        }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginUser} className="login-form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" className="login-btn">Login</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;