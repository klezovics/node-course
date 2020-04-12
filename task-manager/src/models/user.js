const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength:6,
      validate(value){
        if(value.includes('password')){
            throw new Error('Bad password')
        }
      }

    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
         if(value<0) {
             throw new Error('Age must be positive')
         }
      }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }

    }
})

module.exports=User