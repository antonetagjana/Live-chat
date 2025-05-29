// src/services/websocket.js

import { io } from 'socket.io-client';

let socket;

export const connectWebSocket = (token) => {
  socket = io('http://localhost:8080', {
    auth: { token }
  });
  return socket;
};

export const getSocket = () => socket;
