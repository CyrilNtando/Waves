const db = require('../model');

exports.ensureUser = async (req, res, next) => {
  try {
    let token = req.cookies.w_auth;
    let user = await db.User.findByToken(token);
    if (!user) {
      return res.status(401).json({
        isAuth: false,
        message: 'Not Authorized'
      });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
