const express =  require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//To get all the subscriber
router.get('/', async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
   
})

// To get the subscriber from the id
router.get('/:id', getSubscriber, (req, res)=>{
   res.json(res.subscriber)   
})


//To delete the subscriber
router.delete('/:id', getSubscriber, async(req, res)=>{
    try{
        await res.subscriber.deleteOne()
        res.json({message:"The Subscriber deleted Successfully"})
    } catch(error){
        res.status(500).json({message:error.message})
    }
 })



 //To update the subscriber
 router.patch('/:id', getSubscriber, async (req, res)=>{
     if(req.body.name!=null){
         res.subscriber.name = req.body.name
     }
     if(req.body.subscribedToChannel!=null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch(error){
        res.status(400).json({message:error.message})
    }
 })


 //To create the subscriber
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


//Middleware function--Still dont know what it is just copy pasted the code.
async function getSubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber==null){
            return res.status(404).json({message:"Cannot Find the Subscriber"})
        }

    }catch(error){
        return res.status(500).json({message:error.message})
    }
    res.subscriber = subscriber
    next()
}


module.exports = router