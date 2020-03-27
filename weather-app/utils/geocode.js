const request = require('request')
const util = require('util')

const geocode = (address, callback) => {
    const urlTemplate = 'https://api.mapbox.com/geocoding/v5/mapbox.places/%s.json?access_token=pk.eyJ1Ijoia2xpemphIiwiYSI6ImNrOGFkaGgwdzAxNXEzZm9hamJ4d3c0bzcifQ.UuhpSTpImdjTTt3nRpO6Vg'
    const geocodingApiUrl = util.format(urlTemplate, address)
    request({ url: geocodingApiUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to access location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        }
        else {
            const {place_name} = body.features[0]
            const coordinates = body.features[0].geometry.coordinates
            callback(undefined, {
                place_name,
                coordinates
            })
        }
    })
}

module.exports=geocode