const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {

    try{
        const token = req.header("Authorization").replace("Bearer ",'')
        const decoded = jwt.verify(token, 'thisismynewcourse')

        console.log('User id:'+decoded._id)
        console.log('Token:'+token)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token })
        if(!user){
            throw new Error()
        }

        req.token=token
        req.user=user
        next()
    }catch(e){
      console.log(e)
      res.status(401).send({error: "Authentication error"})
    }
   
}

module.exports = auth