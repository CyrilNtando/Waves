const mongoose = require('mongoose');
const db = require('../model');

/*********************************
 * PRODUCTS
 *****************************/
exports.addProduct = async function(req, res, next) {
  try {
    let product = await db.Product.create(req.body);
    product.save();
    return res.status(200).json({
      success: true,
      article: product
    });
  } catch (error) {
    return next({
      success: false,
      ...error
    });
  }
};
exports.getProductById = async function(req, res, next) {
  try {
    let type = req.query.type;
    let items = req.query.id;
    //convert item ids into mongodb object ids
    if (type === 'array') {
      let ids = items.split(',');
      items = ids.map(item => {
        return mongoose.Types.ObjectId(item);
      });
    }
    //get items/item
    let products = await db.Product.find({ _id: { $in: items } })
      .populate('brand')
      .populate('wood');
    return res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
};
exports.getProductByOrder = async function(req, res, next) {
  try {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let products = await db.Product.find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit);
    res.send(products);
    return;
  } catch (error) {
    return next(error);
  }
};

exports.getProductsByFilters = async function(req, res, next) {
  try {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_.id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === 'price') {
          console.log(req.body.filters[key][0]);
          console.log(req.body.filters[key][1]);
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1]
          };
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    findArgs['publish'] = true;
    let products = await db.Product.find(findArgs)
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      size: products.length,
      articles: products
    });
  } catch (error) {
    next({
      status: 400,
      error: error
    });
  }
};
/*********************************
 * CATEGORIES
 *****************************/
exports.createBrand = async function(req, res, next) {
  try {
    let brand = await db.Brand.create(req.body);
    await brand.save();
    res.status(200).json({
      success: true,
      brand: brand
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = `Brand name ${req.body.name} already exists`;
    }
    error.success = false;
    return next(error);
  }
};

exports.getBrands = async function(req, res, next) {
  try {
    let brands = await db.Brand.find();
    res.status(200).send(brands);
  } catch (error) {
    error.success = false;
    return next(error);
  }
};

exports.createWood = async function(req, res, next) {
  try {
    let wood = await db.Wood.create(req.body);
    await wood.save();
    res.status(200).json({
      success: true,
      wood: wood
    });
  } catch (error) {
    error.success = false;
    next(error);
  }
};

exports.getWoods = async function(req, res, next) {
  try {
    let wood = await db.Wood.find();
    res.status(200).send(wood);
  } catch (error) {
    error.success = false;
    next(error);
  }
};
