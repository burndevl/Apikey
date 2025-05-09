const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const app = express();
const port = 3000;

// Endpoint untuk generate API key baru dan menyimpannya ke dalam key.json
app.get('/generate-key', (req, res) => {
  const newApiKey = crypto.randomBytes(16).toString('hex'); // Generate random API key

  const keyFilePath = path.join(__dirname, 'key.json'); // Lokasi file key.json
  
  // Simpan key baru ke dalam key.json
  fs.writeFile(keyFilePath, JSON.stringify({ key: newApiKey }, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save API key' });
    }
    res.json({ message: 'API Key generated and saved successfully', key: newApiKey });
  });
});

// Endpoint untuk mengambil API key yang sudah ada di key.json
app.get('/key', (req, res) => {
  const keyFilePath = path.join(__dirname, 'key.json'); // Lokasi file key.json

  // Membaca file key.json dan mengirimkan key
  fs.readFile(keyFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read key file' });
    }

    const jsonData = JSON.parse(data);
    res.json({ key: jsonData.key });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
