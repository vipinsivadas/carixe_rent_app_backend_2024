const express = require('express')
const Car = require('../model/Car')
const router = express.Router()

router.post('/', async(req, res, next)=>{
    try{
        const carlist = new Car(req.body)
        await carlist.save()
        res.status(201).json(carlist)
    }
    catch(err){
        res.status(500).send('err occured')
    }
   
})

router.get('/:carlistId', async(req, res, next)=>{
    try{
     const car = await Car.findById(req.params.carlistId).exec();
     res.status(200).json(car)
    }
    catch(error){
      res.status(404).send('cars given id not found!')
    }
})

router.get('/', async(req,res, next)=>{
    try{
       const carlist = await Car.find({});
       res.status(200).json(carlist)

    }
    catch(err){
        res.status(500).send('err occured')
    }
})
module.exports = router
