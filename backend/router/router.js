const express = require('express');
const router = express.Router();
const { signup, signin, getUser, logout , forgotPassword , resetPassword} = require('../controller/controller.js');
const jwtAuth = require('../middleware/jwtAuth.js');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user', jwtAuth, getUser);
router.get('/logout', jwtAuth, logout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

module.exports = router;
