const express = require('express')
const Contact = require('../model/Contact')
const router = express.Router()

router.post('/', async(req, res, next)=>{
    try{
        const contact = new Contact(req.body)
        await contact.save()
        res.status(201).json(contact)
        
    }
    catch(err){
        res.status(500).send('invalid contact')
    }
   
})
module.exports = router