import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto'; // Update the import statement


const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const chartRef = useRef(null);
  const [lastPitch, setLastPitch] = useState(null);
  const [lastRoll, setLastRoll] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://test-recovers.onrender.com');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.mensaje) {
        console.log(data.mensaje)
        const newMessage = data.mensaje;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLastPitch(newMessage.pitch);
        setLastRoll(newMessage.roll);
        updateChart();
      }

    };
  }, []);
  const updateChart = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const pitchData = messages.map((message) => message.pitch);
      const rollData = messages.map((message) => message.roll);
      const timestamps = messages.map((message) => message.timestamp);

      chart.data.labels = timestamps;
      chart.data.datasets[0].data = pitchData;
      chart.data.datasets[1].data = rollData;
      chart.update();
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the existing chart if it exists
    }

    const ctx = document.getElementById('chart').getContext('2d');

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Inclinación',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
          },
          {
            label: 'Rotación',
            data: [],
            borderColor: 'rgba(192, 75, 192, 1)',
            backgroundColor: 'rgba(192, 75, 192, 0.2)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Timestamp',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
        
      },
    });

    chartRef.current = newChart;
  }, []);

  return (
    <div>
      <h1>Data desde el dispositivo</h1>
      <h2>Última Inclinación: {lastPitch}</h2>
      <h2>Última Rotación: {lastRoll}</h2>
      <canvas id="chart" />
    </div>
  );
};

export default WebSocketComponent;