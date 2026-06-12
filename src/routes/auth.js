const express = require('express');
const app = express();
const router = express.Router();

const userController = require('../../Controller/UserController');

router.post('/login', userController.login);

module.exports = router;