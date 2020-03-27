const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const util = require('util')
const yargs = require('yargs')
const chalk = require('chalk')

let command = 'weather'
let describe = 'Show weather report'

yargs.command({
    command,
    describe,
    builder: {
        loc: {
            describe: 'Location to get the weather for',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        console.log(chalk.green('Getting the weather'))
        getWeather(argv.loc)
    }
})


const getWeather = (place) => {
    geocode(place, (error, {place_name, coordinates}) => {
        forecast(coordinates[1], coordinates[0], (error, forecastData) => {
            console.log(place_name)
            console.log(forecastData)
        })
    })
}

yargs.parse()
