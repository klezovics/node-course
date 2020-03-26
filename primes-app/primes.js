let List = require("collections/list");

function isPrime(n) {

    n = Math.abs(n);

    if(n==0)
      return false;
    
    if(n==1)
       return false;
    
    for(i=2;i<n;i++) {
        if( n % i == 0)
           return false;
    }

    return true;
}

function getNPrimes(n) {
    let primes = new List()
    let i =2;
    while(primes.length < n ) {
          if(isPrime(i)) {
             primes.push(i)
          }
          i++;
    }

    return primes.toArray();
}

module.exports = getNPrimes