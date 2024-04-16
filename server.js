const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: app.listen(port) });
console.log(`Server is running on http://localhost:${port}`);

let counter = 0;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/phone', (req, res) => {
  res.sendFile(path.join(__dirname, 'phone.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'game.html'));
});

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  ws.send(JSON.stringify({ counter }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Broadcast the received data to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});