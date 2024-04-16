const express = require('express');
const app = express();
const clients = [];

app.use(express.json());

app.post('/api/data', (req, res) => {
  const { x_data, y_data } = req.body;
  console.log('Received data:', x_data, y_data);

  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify({ x_data, y_data })}\n\n`);
  });

  res.sendStatus(200);
});

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post('/api/data', (req, res) => {
//   const { x_data, y_data } = req.body;
//   console.log('Received data:', x_data, y_data);
//   // Send data to game.js (explained in Step 3)
//   res.sendStatus(200);
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

