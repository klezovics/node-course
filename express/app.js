const express = require('express')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', ({query}, res) => {

    let user = query.user;
    let responseData = {greeting: "Hello world"}
    if(user) {
        responseData.user = user;
    }

    res.send(responseData)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
