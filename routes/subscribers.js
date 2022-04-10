const express =  require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
   
})

router.post('/', async (req, res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    })
    try {
        const newSubscriber  = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
   
})


module.exports = router