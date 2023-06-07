const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location = require('./utils/location.js')
const forecast = require('./utils/forecast.js')

const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates')
const partialDirectory = path.join(__dirname,'../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialDirectory)

app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        heading: 'Weather App Home Page',
        paragraph: 'Weather App Paragraph'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Title',
        desc: 'About Description'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Title',
        desc: 'Help Description'
    })
})

app.get('/weather', (req,res) => {

    
    if(!req.query.location){
        return res.send({
            error: 'Location is missing'
        })
    }

    location(req.query.location,(error,{latitude,longitude,location}={}) => {
            if(error){
                return res.send({
                    error
                })
            }

            forecast(latitude,longitude,(forecasterror,{localtime,temperature,weather_icons,weather_desc,feels_like,humidity})=> {

            const forecast = 'The forecast at '+location+' is '+temperature+' degree,but it feels like '+feels_like+' degree.The humidity is '+humidity+'%.'

                res.send({
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                    localtime,
                    temperature,
                    weather_icons,
                    weather_desc,
                    feels_like,
                    humidity,
                    forecast : forecast
                })
            })
            
        
    })

    
})

app.get('*', (req,res) => {
    res.render('404',{
        content: 'the page not found from hbs'
    })
})
app.listen(3000, () => {
    console.log('server is running')
})