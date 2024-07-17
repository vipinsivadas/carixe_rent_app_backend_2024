const express = require('express')
const Booking = require('../model/Booking')
const router = express.Router()



router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


 
router.delete('/:bookingsId', async (req, res) => {
    const { bookingsId } = req.params;
    try {
        await Booking.findByIdAndDelete(bookingsId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router