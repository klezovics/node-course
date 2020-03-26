const primeGetter = require('./primes.js')

const primeNum = process.argv[2]
console.log(primeGetter(primeNum))