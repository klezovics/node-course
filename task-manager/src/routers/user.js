const express=require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth')


router.post("/users", async ({ body }, res) => {

    try {
        const user = new User(body)
        await user.save()
        const token = await user.generateAuthToken()
        
        console.log("Saved user:" + user)
        res.status(201).send({user:user.getPublicProfile(),token})
    } catch (e) {
        console.log('Error:' + e)
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res) => {
    try{
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()
       res.send({user: user.getPublicProfile(),token})
    }catch(e) {
       console.log(e)
       res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async (req,res) => {
    try{

       req.user.tokens= req.user.tokens.filter((token)=>{
           return token.token !== req.token
       })

       await req.user.save()
       res.send()
    }catch(e) {
       console.log(e)
       res.status(500).send(e)
    }
})

router.post('/users/logout_all',auth,async (req,res) => {
    try{

       req.user.tokens=[]

       await req.user.save()
       res.send()
    }catch(e) {
       console.log(e)
       res.status(500).send(e)
    }
})

router.get("/users",auth,async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        console.log('Error:' + e)
        res.status(500).send(error)
    }
})

router.get("/users/me",auth,async (req, res) => {

    try {
        res.send(req.user)
    } catch (e) {
        console.log('Error:' + e)
        res.status(500).send(error)
    }
})

router.patch("/users/:id",auth, async (req, res) => {
    let user = req.user
    
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update operation'})
    }

    try {    
        updates.forEach((update)=>{
           user[update]=req.body[update]
        })

        user = await user.save()
        
        if (!user) {
            return res.status(404).send()
        }

        console.log("Updated user:" + user)

        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete("/users/me",auth, async (req, res) => {
    try {
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        console.log("Deleted:" + req.user)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(error)
    }
})


module.exports=router