const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100
    },
    description: {
      type: String,
      required: true,
      maxLength: 100000
    },
    price: {
      type: Number,
      required: true,
      maxLength: 255
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },
    wood: {
      type: Schema.Types.ObjectId,
      ref: 'Wood',
      required: true
    },
    shipping: {
      required: true,
      type: Boolean
    },
    available: {
      required: true,
      type: Boolean
    },
    frets: {
      required: true,
      type: Number
    },
    sold: {
      type: Number,
      maxLength: 100,
      default: 0
    },
    publish: {
      required: true,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
