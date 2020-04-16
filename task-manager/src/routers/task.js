const express=require('express')
const router = new express.Router()
const Task = require('../models/task.js')
const auth = require('../middleware/auth')


router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })


    try {
        await task.save()
        console.log("Saved task:" + task)
        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get("/tasks",auth,async (req, res) => {
    const user = req.user

    try {
        tasks = await Task.find({owner:user._id})
        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get("/tasks/:id",auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(error)
    }
})

router.patch("/tasks/:id", async (req, res) => {
    const _id = req.params.id

    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update operation'})
    }

    try {
        let task = await Task.findById(_id)

        if (!task) {
            return res.status(400).send()
        }
        
        updates.forEach((update)=>{
            task[update]=req.body[update]
         })
 
        task = await task.save()

        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        console.log("Deleted:" + task)
        res.send(task)
    } catch (e) {
        res.status(500).send(error)
    }
})

module.exports=router