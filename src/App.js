// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Messenger from './components/Messenger';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Faqja kryesore */}
          <Route path="/" element={<HomePage />} />

          {/* Login dhe regjistrim */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Messenger që përmban ConversationList + ChatRoom në një faqe */}
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
