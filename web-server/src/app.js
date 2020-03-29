const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 3000

const viewsPath = path.join(__dirname,'..','templates','views')
const partialsPath = path.join(__dirname,'..','templates','partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

const staticResourcePath = path.join(__dirname,'..','public')
app.use(express.static(staticResourcePath))

app.get('',(req,res) => {
    res.render('index',{title:'Weather App', name: 'AK'})
})

app.get('/about', (req, res) => {
    res.render('about',{title:'About page', info:'This is some about info', name: 'AK'})
})

app.get('/help', (req, res) => {
    res.render('help',{title:'Help page', info:'You can find help info here', name: 'AK'})
})

app.get('/weather', (req, res) => {
    res.send({forecase:'Sunny', location: 'Berlin',  name: 'AK'})
})

app.get('/help/*',(req,res) => {
    res.render('not-found-help', {title: 'Help page not found', name: 'AK1'})
 })

app.get('*',(req,res) => {
   res.render('not-found', {title: 'Page not found', name: 'AK'})
})

app.listen(port, () => {
    console.log('App listening on port ' + port)
})