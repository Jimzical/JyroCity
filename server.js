const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const WebSocket = require('ws');

app.use(express.static('public'));

const fs = require('fs');
const URL = fs.readFileSync('url.txt', 'utf8');
console.log(`URL: ${URL}`);

const DOMAIN = URL.split('/')[2];
// console.log(`DOMAIN: ${DOMAIN}`);

app.get('/domain', (req, res) => {
  res.send(DOMAIN);
});

const wss = new WebSocket.Server({ server: app.listen(port) });
// console.log(`Server is running on http://localhost:${port}`);

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
  // ws.send(JSON.stringify({ buttonPressed, counter }));

  // Listen for messages from the client
  ws.on('message', (message) => {
    const data = JSON.parse(message);
  
    let orientationData = { alpha: 0, beta: 0, gamma: 0 };
    if (data.buttonPressed !== undefined) {
      buttonPressed = data.buttonPressed;
      if (buttonPressed) {
        orientationData = data.orientationData;
        orientationData.beta = orientationData.beta;
        orientationData.gamma = orientationData.gamma;

        // this logic is set up as alpha defaults to 270 whenever started
        orientationData.alpha -= 270;

        if (orientationData.alpha < -180) {
          orientationData.alpha = 360 + orientationData.alpha;
        }

      } else {
        orientationData = 0;
      }

      console.log(`data: ${data.orientationData.alpha}, ${data.orientationData.beta}, ${data.orientationData.gamma}`);

      // Broadcast the updated button press state and orientation value to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ buttonPressed, orientationData }));
        }
      });
    }
  });
});