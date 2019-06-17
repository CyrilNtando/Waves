const db = require('../model');
const mongoose = require('mongoose');
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

exports.addToCart = async function(req, res, next) {
  try {
    let user = await db.User.findOne({ _id: req.user._id });
    let duplicate = false;

    user.cart.forEach(item => {
      if (item.id.equals(req.query.productId)) {
        duplicate = true;
      }
    });

    if (duplicate) {
      user = await db.User.findOneAndUpdate(
        {
          _id: req.user._id,
          'cart.id': mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true }
      );

      res.status(200).json(user.cart);
    } else {
      user = await db.User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true }
      );

      res.status(200).json(user.cart);
    }
  } catch (error) {
    return next({
      success: false,
      error
    });
  }
};

exports.removeFromCart = async function(req, res, next) {
  try {
    let user = await db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
      { new: true }
    );

    let cart = user.cart;
    let array = await cart.map(item => {
      return mongoose.Types.ObjectId(item.id);
    });

    let product = await db.Product.find({ _id: { $in: array } })
      .populate('brand')
      .populate('wood');

    return res.status(200).json({
      cartDetail: product,
      cart
    });
  } catch (error) {
    next(error);
  }
};

exports.successBuy = async (req, res, next) => {
  try {
    let history = [];
    let transtactionData = {};
    //add cart to history
    await req.body.cartDetail.forEach(item => {
      history.push({
        dateOfPurchase: Date.now(),
        name: item.name,
        brand: item.brand,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentData.paymentID
      });
    });
    //PAYMENT
    //user tans info
    transtactionData.user = {
      id: req.user._id,
      name: req.user.name,
      lastname: req.user.lastname,
      email: req.user.email
    };
    //paypal data
    transtactionData.data = req.body.paymentData;
    transtactionData.product = history;

    //find user update history and empty cart
    let user = await db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { history: history }, $set: { cart: [] } },
      { new: true }
    );
    //create new Payment
    let payment = await db.Payment.create(transtactionData);
    await payment.save();

    //
    let products = [];
    await payment.product.forEach(item => {
      products.push({
        id: item.id,
        quantity: item.quantity
      });
    });
    await products.forEach(async item => {
      try {
        await db.Product.update(
          { _id: item.id },
          { $inc: { sold: item.quantity } },
          { new: false }
        );
      } catch (error) {
        return next({
          success: false,
          message: 'Updating Product Sold Failed'
        });
      }
    });

    res.status(200).json({
      success: true,
      cart: user.cart,
      cartDetail: []
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async function(req, res, next) {
  try {
    let user = await db.User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return next({
      success: false
    });
  }
};
