const request = require('request')
const util = require('util')


const forecast = (x, y, callback) => {
    const url = util.format('https://api.darksky.net/forecast/e4d6e25141bde3d3f0d5764aa3ee6bc4/%s,%s?units=si', x, y)
    const json = true

    request({ url, json }, (error, {body}) => {

        if (error) {
            callback('Some OS error', undefined)
        } else if (body.error) {
            callback('Some API error', undefined)
        } else {
            const {currently, daily} = body
            forecastStr = daily.data[0].summary +
                'It is currently ' + currently.temperature + ' degrees out' +
                'There is ' + currently.precipProbability + ' % chance of rain'
            callback(undefined, forecastStr)
        }
    })
}

module.exports = forecast

