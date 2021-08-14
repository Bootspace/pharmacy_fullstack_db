const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// CRUD
// GET - Gets Data
// POST - Uploads Data
// PATCH - Updates Data
// DELETE - Removes Data

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Works!',
  });
});

app.listen(3000, () => {
  console.log('App is running!');
});
