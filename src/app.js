const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akintoye Arogunmati'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akintoye Arogunmati'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akintoye Arogunmati'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : "provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location, temperature, feelLike } = {}) => {
        if (error) {
            return res.send({
                error : 'Unknown location'
            })
        }
        // forecast(latitude, longitude, (error, forecastData) => {
        //     if (error) {
        //         return res.send({
        //             error : 'could not find forcast data'
        //         })
        //     }

        //     res.send({
        //         forecast: forecastData,
        //         location,
        //     })
        // })
        res.send({
            latitude,    
            longitude,    
            temperature,
            location,
            feelLike,
            forecast: "It is currently " + temperature + 'degrees, but it feels like ' + feelLike
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : "provide a search term"
        })
    }
    res.send({
        'products' : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akintoye Arogunmati',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akintoye Arogunmati',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})