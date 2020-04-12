const express = require('express')
require('./db/mongoose.js')

const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users", ({ body }, res) => {
    const user = new User(body)
    user.save().then((saved_user) => {
        console.log("Saved user:" + saved_user)
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get("/users", (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.get("/users/:id", (req, res) => {
    const _id = req.params.id
    console.log(req.params)
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500).send(error)
    })
})





app.post("/tasks", ({ body }, res) => {
    const task = new Task(body)
    task.save().then((saved_task) => {
        console.log("Saved task:" + saved_task)
        res.status(201).send(saved_task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get("/tasks", (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)
    }).catch((error) => {
        res.status(500).send(error)
    })
})



app.listen(port, () => {
    console.log('Server listening on port ' + port)
})