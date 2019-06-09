const db = require('../model');
//get cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
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

exports.uploadImage = async function(req, res, next) {
  try {
    cloudinary.uploader.upload(
      req.files.file.path,
      result => {
        console.log(result);
        res.status(200).send({
          public_id: result.public_id,
          url: result.url
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
      }
    );
  } catch (error) {}
};

exports.removeImage = async function(req, res, next) {
  try {
    let image_id = req.query.public_id;
    await cloudinary.v2.uploader.destroy(image_id, (err, result) => {
      if (err) {
        return next({
          success: false
        });
      } else {
        return res.status(200).json({
          success: true
        });
      }
    });
  } catch (error) {}
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
