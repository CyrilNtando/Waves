//get express
const express = require('express');
//init router
const router = express.Router();
//auth middleware
const { ensureUser } = require('../middleware/auth');
//User handler
const {
  signUp,
  signIn,
  signOut,
  getAuthUser
} = require('../handler/userHandler');

//api/users/register
router.post('/register', signUp);
router.post('/login', signIn);
router.get('/auth', ensureUser, getAuthUser);
router.get('/logout', ensureUser, signOut);
module.exports = router;
