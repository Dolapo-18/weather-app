const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48aa8584e7dab8b15bd7ef1fe1b5d12a&query='+latitude+','+longitude+'&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to fetch co-ordinates', undefined)

        } else if(body.error) {
            callback('Unable to fetch results. Try again', undefined)

        } else {
            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`)
        }
    })
}


module.exports = forecast