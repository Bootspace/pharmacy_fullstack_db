require('dotenv').config();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const secret = process.env.JWT_SECRET;
let maxAge = 3600;

const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge
  })};

const authValidator = () => {
  return [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email','Please enter a valid Email').trim().isEmail(),
    check('password', 'Password must contain atleast 6 characters').isLength({ min: 6})
  ]};

  const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
      return next()
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({
      [err.param] : err.msg }))

      console.log(errors);
      return res.status(400).json({ errors: extractedErrors })
  };

  module.exports = { createToken, authValidator, validateError };