// src/components/Login.js

import React, { useState } from 'react';
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'fake-jwt-token');
    window.location.href = '/messenger';
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginUser} className="login-form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
    </div>
  );
}

export default Login;
