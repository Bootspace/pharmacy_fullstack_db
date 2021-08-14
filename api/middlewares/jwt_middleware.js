const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  // Requesting for token 
  const token = req.cookies.jwt;
  console.log('This is your token' + token);
  
  // Check if token exists then verify
  if(token){
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) return res.status(400).json(err.message);

      console.log(decodedToken);
      next()
    })
  };
}

module.exports = { requireAuth };