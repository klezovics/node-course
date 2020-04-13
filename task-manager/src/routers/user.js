const express=require('express')
const router = new express.Router()
const User = require('../models/user.js')


router.post("/users", async ({ body }, res) => {
    const user = new User(body)

    try {
        await user.save()
        console.log("Saved user:" + user)
        res.status(201).send(user)
    } catch (e) {
        console.log('Error:' + e)
        res.status(400).send(e)
    }
})

router.get("/users", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        console.log('Error:' + e)
        res.status(500).send(error)
    }
})

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        console.log("Found user:" + user)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(error)
    }
})

router.patch("/users/:id", async (req, res) => {
    const _id = req.params.id
    
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update operation'})
    }

    try {
        const user = await User.findByIdAndUpdate(_id,req.body,{new:true, runValidators: true})
        
        if (!user) {
            return res.status(404).send()
        }

        console.log("Updated user:" + user)

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete("/users/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        console.log("Deleted:" + user)
        res.send(user)
    } catch (e) {
        res.status(500).send(error)
    }
})


module.exports=router