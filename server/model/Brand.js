const mongoose = require('mongoose');

BrandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100
  }
});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;
