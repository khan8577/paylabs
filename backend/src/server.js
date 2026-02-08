const express = require('express');
const cors = require('cors');
const redisClient = require('./redisClient');


const app = express();
app.use(cors());


app.get('/api/message', async (req, res) => {
let visits = await redisClient.get('visits');
visits = visits ? parseInt(visits) + 1 : 1;
await redisClient.set('visits', visits);


res.json({ message: `Hello! Visits: ${visits}` });
});


app.listen(5000, () => console.log('Backend running on 5000'));