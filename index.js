const express = require('express')
const  cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')
const CarlistRoutes = require('./routes/CarlistRoutes')
const ContactRoutes = require('./routes/ContactRoutes')
const BookingRoutes = require('./routes/BookingRoutes')

const app = express()
const port = 3000
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["GET", "POST", "PATCH", "DELETE"],
  credentials: true 
}))
app.use(cookieParser())
app.use(express.json())


app.use('/users/signup', UserRoutes)
app.use('/users', UserRoutes)
app.use('/users', UserRoutes)
app.use('/carlist', CarlistRoutes)
app.use('/carlist/:carlistId',CarlistRoutes)
app.use('/contact', ContactRoutes)
app.use('/bookings',BookingRoutes)
app.use('/bookings/:bookingsId',BookingRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

main().then(() => console.log('DB connect')).catch(err => console.log(err));

async function main() {
  const url = process.env.DB_URL
  const password = process.env.DB_PASSWORD
  const urlWithPassword = url.replace('<password>', password)
  await mongoose.connect(urlWithPassword);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
