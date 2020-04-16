const express = require('express')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const auth = require('./middleware/auth')

require('./db/mongoose.js')

const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next) => {
//    res.status(500).send({msg:"Maintenance"})
//    next()
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})


// const main = async () => {
//     const task = await Task.findById("5e98aa7e38af2865c65c77a3")
//     await task.populate('owner').execPopulate()
//     console.log(task.owner.name)

//     const user = await User.findById("5e9831e65cde62d91b1241c4")
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()

// const jwt = require('jsonwebtoken')

// const mf = async () => {
//     const token = jwt.sign({_id: 'abc123'},'thisismynewcourse', {expiresIn: '0 seconds'})
//     console.log(token)

//     const data = jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }

// mf()