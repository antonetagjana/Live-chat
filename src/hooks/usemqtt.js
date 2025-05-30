import { useState, useEffect, useRef } from 'react';
import mqtt from 'mqtt';

const useMqtt = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const clientRef = useRef(null);
  const topic = `chat/${roomId}`;

  useEffect(() => {
    const brokerUrl = 'ws://test.mosquitto.org:8080/mqtt'; // Try 'wss://test.mosquitto.org:8081/mqtt' if issues persist
    // Alternative: 'ws://broker.emqx.io:8083/mqtt'
    const clientId = `frontendClientID_${Math.random().toString(16).slice(3)}`;

    const options = {
      clientId,
      connectTimeout: 10000,
      keepalive: 60,
      clean: true,
      reconnectPeriod: 1000,
      rejectUnauthorized: false,
    };

    const client = mqtt.connect(brokerUrl, options);

    client.on('connect', () => {
      console.log(`Connected to MQTT broker, subscribing to topic: ${topic}`);
      setConnectionStatus('connected');
      client.subscribe(topic, { qos: 0 }, (err) => {
        if (err) {
          console.error(`Subscription error for topic ${topic}:`, err);
          setConnectionStatus('error');
        }
      });
    });

    client.on('message', (topic, message) => {
      try {
        const parsed = JSON.parse(message.toString());
        console.log('Received:', parsed);
        setMessages((prev) => [...prev, parsed]);
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });

    client.on('error', (error) => {
      console.error('MQTT connection error:', error);
      setConnectionStatus('error');
    });

    client.on('close', () => {
      console.log('Disconnected from MQTT broker');
      setConnectionStatus('disconnected');
    });

    client.on('reconnect', () => {
      console.log('Attempting to reconnect to MQTT broker');
      setConnectionStatus('reconnecting');
    });

    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.unsubscribe(topic);
        client.end(true);
        console.log(`Unsubscribed and disconnected from topic: ${topic}`);
      }
    };
  }, [roomId]);

  return { messages, setMessages, connectionStatus };
};

export default useMqtt;