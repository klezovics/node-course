require('../src/db/mongoose')
const User = require('../src/models/user')

// 5e9371d48a2778a92618254e
User.findByIdAndUpdate('5e9371d48a2778a92618254e',{age:99}).then((u)=>{
  console.log(u)
  return User.countDocuments({age:99})
}).then((result)=>{
  console.log(result)
})

