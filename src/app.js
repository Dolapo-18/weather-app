const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
//customizing views directory
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set our view engine to hbs
app.set('view engine', 'hbs')

//serving up our custom views directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//serving up our static directory
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ezekiel Doe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ezekiel Doe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ezekiel Doe',
        phone: '+23480AE32CBA3'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
    
    
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        res.send({
            forecast: forecastData,
            location,
            address
        })
    })
    
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Kindly provide a search term!'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: 'Page Error',
        message: 'Help Article Not Found :(',
        name: 'Ezekiel Doe'
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        title: 'Error 404',
        message: 'Page Not Found :(',
        name: 'Ezekiel Doe'
    })
})

app.listen(3000, () => {
    console.log('Server Running...')
})
