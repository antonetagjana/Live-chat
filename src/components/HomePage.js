// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1>Welcome to the Chat System</h1>
        <p>This is a simple communication system that allows you to exchange messages with your friends.</p>
        
        <div className="homepage-buttons">
          <Link to="/login">
            <button className="home-button login-button">Log In</button>
          </Link>
          <Link to="/register">
            <button className="home-button register-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
