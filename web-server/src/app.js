const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const staticResourcePath = path.join(__dirname, '..', 'public')
app.use(express.static(staticResourcePath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App', name: 'AK' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About page', info: 'This is some about info', name: 'AK' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help page', info: 'You can find help info here', name: 'AK' })
})

app.get('/weather', (req, res) => {

    let address = req.query.address

    if (!address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error, {place_name, coordinates} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        const x = coordinates[1]
        const y = coordinates[0]

        forecast(x, y, (error, result) => {
            if (error) {
                return res.send({error})
            }

            res.send({ place_name, coordinates, result })
        })
    })

    //res.send({forecase:'Sunny', location: address})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide search term'
        })
    }

    res.send({ productions: [] })
})

app.get('/help/*', (req, res) => {
    res.render('not-found-help', { title: 'Help page not found', name: 'AK1' })
})

app.get('*', (req, res) => {
    res.render('not-found', { title: 'Page not found', name: 'AK' })
})

app.listen(port, () => {
    console.log('App listening on port ' + port)
})