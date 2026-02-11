const express = require('express');
const cors = require('cors');
const redisClient = require('./redisClient');

const app = express();
app.use(cors());

app.get('/healthz', async (req, res) => {
  try {
    await redisClient.ping();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/message', async (req, res) => {
  let visits = await redisClient.get('visits');
  visits = visits ? Number.parseInt(visits, 10) + 1 : 1;
  await redisClient.set('visits', visits);

  res.json({ message: `Hello! Visits: ${visits}` });
});

module.exports = app;
