const express = require('express')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

require('./db/mongoose.js')

const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})