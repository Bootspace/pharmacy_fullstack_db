const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up MongodAtlas
mongoose.connect(process.env.MONGO_URL2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then((result) => console.log('DB fired...'))
.catch((err) => console.log(err));

// Bringing in the Router logic
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Works!',
  });
});

app.listen(3000, () => {
  console.log('App is running!');
});
