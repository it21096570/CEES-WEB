const express = require('express');
const { register } = require('../controllers/thanuja.controller');
const { verify } = require('jsonwebtoken');


const router = express.Router();

router.post('/register', register);

module.exports = router;