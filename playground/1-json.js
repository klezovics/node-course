const fs = require('fs')

// const book = {
//     title: 'War and Peace',
//     author: 'Leo Tolstoy'
// }

// const bookJson = JSON.stringify(book)
// console.log(bookJson)

// fs.writeFileSync('1-json.json', bookJson)
// const buffer = fs.readFileSync('1-json.json')
// const dataJson = buffer.toString();
// const data = JSON.parse(dataJson)
// console.log(data.title)

const data = JSON.parse(fs.readFileSync('data.json').toString())
data.name = 'Arthur'
data.age = '30'

const out = data
fs.writeFileSync('data.json', JSON.stringify(out))