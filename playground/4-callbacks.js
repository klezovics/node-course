const doWorkCallback = (callback) => {
   setTimeout(()=> {
      //callback('This is my error', undefined)
      callback(undefined,'Results are here')
   },2000)
}

doWorkCallback((error, result) => {
   if(error) {
       return console.log('Error:'+error)
   }

   console.log(result)
})