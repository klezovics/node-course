const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})