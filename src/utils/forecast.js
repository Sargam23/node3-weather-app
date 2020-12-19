const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=70a3836086f8d1d66abdc2ef043a8fd2&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback( body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees out.  It feels like '+body.current.feelslike+' degrees out . The humidity is a ' + body.current.humidity + '%.')
        }
    })
}   
    
module.exports = forecast