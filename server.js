const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: app.listen(port) });
console.log(`Server is running on http://localhost:${port}`);

let buttonPressed = false;
let counter = 0;

// Serve the main website
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the phone page
app.get('/phone', (req, res) => {
  res.sendFile(path.join(__dirname, 'phone.html'));
});

// Serve the game page
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'game.html'));
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection from server.js');

  // Send the current button press state and counter value to the client
  ws.send(JSON.stringify({ buttonPressed, counter }));

  // Listen for messages from the client
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.buttonPressed !== undefined) {
      buttonPressed = data.buttonPressed;
      if (buttonPressed) {
        counter++;
      } else {
        counter = 0;
      }
      console.log(`Button press state updated: ${buttonPressed}, Counter: ${counter}`);

      // Broadcast the updated button press state and counter value to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ buttonPressed, counter }));
        }
      });
    }
  });
});