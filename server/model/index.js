//get moongoose
const mongoose = require('mongoose');
//set mongoose for debugging
mongoose.set('debug', true);
//set mongoose to use promises
mongoose.Promise = Promise;
//connect mongoose to database
console.log(process.env.DATABASE);
mongoose.connect(process.env.DATABASE, {
  useFindAndModify: false,
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true
});
module.exports.User = require('./User');
module.exports.Brand = require('./Brand');
module.exports.Wood = require('./Wood');
module.exports.Product = require('./Product');
module.exports.Payment = require('./Payment');
