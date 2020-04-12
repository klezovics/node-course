const express = require('express')
require('./db/mongoose.js')

const User = require('./models/user.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users",({body},res)=>{
   const user = new User(body)
   user.save().then((saved_user)=>{
      console.log("Saved user:"+saved_user)
      res.send(user)
   }).catch((error)=>{
       res.status(400).send(error)
   })
})

app.listen(port, ()=>{
    console.log('Server listening on port '+port)
})