const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    image:String,
    name:String,
    price: String,
    startDate: Date,
    endDate: Date,
    user: {
        email: String,
        name: String,
        phone: String
    }
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking