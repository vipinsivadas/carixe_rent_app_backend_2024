const express = require('express')
const User = require('../model/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router()


router.post('/', async (req, res,) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User({
      ...req.body,
      password: hash
    })
    await user.save()
    res.status(201).json(user)
  }
  catch (err) {
    res.status(400).send('invalid signup')
  }

})

router.post('/:login', async (req, res,) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(404).send('user not found')
    }

    const Auth = bcrypt.compareSync(password, user.password);
    if (!Auth) {
      return res.status(401).send('Login faild')
    }

    const token = jwt.sign({ _id: user._id, firstname: user.firstname }, process.env.JWT_SECRET, {
      expiresIn: 3 * 24 * 60 * 60,
    });

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    })
    res.status(200).json({ message: "logged in Successfully",user:{_id: user._id, firstname:user.firstname }})
  }
  catch (err) {
    res.status(400).send('Invalid login')
  }

})

router.post('/verify', async(req, res,)=>{
  const token = req.cookies.token

  if(!token){
    return res.status(401).send('user not logged in')
  }
  return res.status(200).send('User is logged in')
})


module.exports = router