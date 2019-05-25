const db = require('../model');

exports.signIn = async function(req, res, next) {
  console.log('pass0');
  try {
    //find the email
    let user = await db.User.findOne({ email: req.body.email });
    if (user) {
      //if user found
      let isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        await user.generateToken(user, next);
        res
          .cookie('w_auth', user.token)
          .status(200)
          .json({
            success: true
          });
      } else {
        return next({
          message: 'Invalid Password'
        });
      }
    } else {
      return next({
        message: 'Sorry email not found'
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.signUp = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    await user.save();
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    // if the validation fails
    if (error.code === 11000) {
      // respond with this msg
      error.message = 'Sorry, that username and/or email is taken';
    }
    return next({
      status: 400,
      message: error.message
    });
  }
};

exports.getAuthUser = async function(req, res, next) {
  try {
    res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history
    });
  } catch (error) {
    return next({
      message: 'You need to log in first'
    });
  }
};

exports.signOut = async function(req, res, next) {
  try {
    let user = await db.User.findOneAndUpdate(
      {
        _id: req.user._id
      },
      { token: '' }
    );
    if (user) {
      return res.status(200).json({
        success: true
      });
    } else {
      return next({
        success: false
      });
    }
  } catch (error) {
    error.success = false;
    next(error);
  }
};
