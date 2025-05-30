import React, { useState } from 'react';
import './Login.css'; 
import { useUser } from '../context/userContext';
import login from '../apiClients/login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUser(); // get setUser from context

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const userData = await login(username, password);
      setUser(userData); // Set globally
      setError(null);
      window.location.href = '/messenger';
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
