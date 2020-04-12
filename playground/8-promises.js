const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=> {
        reject("WRONG!")
     },2000)
})

doWorkPromise.then( (result)=> {
    console.log("OK:"+result)
} ).catch( (error) => {
    console.log(error)
})