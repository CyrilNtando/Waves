//get express
const express = require('express');
//init router
const router = express.Router();
//get express- formidable
const formidable = require('express-formidable');
//auth middleware
const { ensureUser } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
//User handler
const {
  signUp,
  signIn,
  signOut,
  getAuthUser,
  uploadImage,
  removeImage,
  addToCart,
  removeFromCart,
  successBuy,
  updateUser
} = require('../handler/userHandler');

//api/users/register
router.post('/register', signUp);
router.post('/login', signIn);
router.get('/auth', ensureUser, getAuthUser);
router.get('/logout', ensureUser, signOut);
router.post('/uploadimage', ensureUser, admin, formidable(), uploadImage);
router.get('/removeimage', ensureUser, admin, removeImage);
router.post('/addToCart', ensureUser, addToCart);
router.get('/removeFromCart', ensureUser, removeFromCart);
router.post('/successBuy', ensureUser, successBuy);
router.post('/update_profile', ensureUser, updateUser);
module.exports = router;
