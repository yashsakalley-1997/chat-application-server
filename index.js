const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiEndpoint = 'https://chat.nbox.ai/api/chat/completions';

app.post('/api', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.post(`${apiEndpoint}`, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apiKey}`
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    const { q, from } = req.query;
    const apiResponse = await axios.get(`https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`);
    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
