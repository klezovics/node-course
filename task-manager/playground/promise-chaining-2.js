require('../src/db/mongoose')
const Task = require('../src/models/task')

// 5e9371d48a2778a92618254e
Task.countDocuments({ completed: false }).then((result) => {
    console.log("Incompleted tasks:"+result)
    return Task.findByIdAndDelete('5e935e7a01b53887efeda130')
  })
  .then((t)=> {
     console.log("Deleted task"+t)
     return Task.countDocuments({completed:false})
  })
  .then((result) => {
    console.log("Incomplete tasks" + result)
  })

