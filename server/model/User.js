//get mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtToken = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/.env' });
//create a schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

//before saving user encrypt password
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    } else {
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    }
  } catch (error) {
    next(err);
  }
});

//check if user password matches cadidate password
UserSchema.methods.comparePassword = async function(cadidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(cadidatePassword, this.password);
    return isMatch; //true or false
  } catch (error) {
    next(error);
  }
};
UserSchema.methods.generateToken = async function(user, next) {
  try {
    let token = await jwtToken.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    await user.save();
    return user;
  } catch (error) {
    return next(error);
  }
};
UserSchema.statics.findByToken = function(token) {
  let user = this;
  return new Promise((resolve, reject) => {
    jwtToken.verify(token, process.env.SECRET, (err, decode) => {
      user
        .findOne({ _id: decode, token: token })
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  });
};
//create a model
const User = mongoose.model('User', UserSchema);
module.exports = User;
