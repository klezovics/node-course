const path = require('path')
const express = require('express')

const app = express()

const staticResourceFolder = path.join(__dirname,'..','public')


const port = 3000
let count=0;

app.use(express.static(staticResourceFolder))


// app.get('/help', (req, res) => {
//     count++
//     res.send({helpMsg: "Help is here"})
// })

// app.get('/about', (req, res) => {
//     count++
//     res.send('<h2>This is an app</h2>')
// })

app.get('/weather', (req, res) => {
    count++
    res.send({forecase:'Sunny', location: 'Berlin'})
})

app.listen(port, () => {
    console.log('App listening on port ' + port)
})