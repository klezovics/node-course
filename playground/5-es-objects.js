// const name = 'AK'
// const userAge = '30'

// const user = {
//     name,
//     age: userAge,
//     location: 'Berlin'
// }



// console.log(user)

const product = {
    label: 'Red notebook',
    price: 3, 
    stock: 200, 
    salePrice: undefined
}

// const {label:productLabel,stock, rating = 5} = product

// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type,{label, stock=1}={}) => {
   console.log(type, label, stock)
}

transaction('Order')



