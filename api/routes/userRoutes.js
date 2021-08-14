const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { authValidator, validateError } = require('../middlewares/auth_middleware');

router.post('/register', authValidator(), validateError, userController.addUser);

router.post('/login', userController.userLogin);

module.exports = router;