const express = require('express');
const app = express();
const port = 3000;
const crypto = require('crypto');

// Static files seperti HTML jika diperlukan
app.use(express.static('public')); 

// Endpoint untuk mendapatkan API key
app.get('/key', (req, res) => {
  const apiKey = crypto.randomBytes(16).toString('hex'); // Generate key
  res.json({ key: apiKey });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
