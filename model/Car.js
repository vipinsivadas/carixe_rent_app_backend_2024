const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    image: String,
    name:String,
    Discription:String,
    model:String,
    price:String,
    fuel:String

})
const Car = mongoose.model('Car', carSchema);
  module.exports = Car