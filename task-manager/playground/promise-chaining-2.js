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


const processTasks = async (id,completed) => {
  c1 = await Task.countDocuments(completed)
  t = await Task.findByIdAndDelete(id)
  c2 = await Task.countDocuments(completed)
  console.log("c1:"+c1)
  console.log("t:"+t)
  console.log("c2"+c2)
}

processTasks('5e93740228736baef0642973',false)