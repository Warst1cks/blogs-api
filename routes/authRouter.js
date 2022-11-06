const express = require('express');
const authRouter = express.Router();
const {signup}= require('../controllers/authController');
const {signin} = require('../controllers/authController');

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)

module.exports = authRouter;