import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://your-websocket-url'); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Inclinación:</h2>
      <p>{message.pitch}</p>
      <h2>Rotación:</h2>
      <p>{message.roll}</p>
    </div>
  );
};

export default WebSocketComponent;
