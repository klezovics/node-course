const request = require('request')
const util = require('util')


const forecast = (x, y, callback) => {
    const url = util.format('https://api.darksky.net/forecast/e4d6e25141bde3d3f0d5764aa3ee6bc4/%s,%s?units=si', x, y)
    const json = true

    request({ url, json }, (error, {body}) => {

        if (error) {
            callback('Some OS error', undefined)
        } else if (body.error) {
            console.log(url)
            callback('Some API error '+body.error, undefined)
        } else {
            const {currently, daily} = body
            const forecast = {
                summary: daily.data[0].summary,
                temperature: currently.temperature,
                precipProbability: currently.precipProbability

            }
            callback(undefined, forecast)
        }
    })
}

module.exports = forecast

