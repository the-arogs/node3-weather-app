const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const ur = 'api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=05ba532a53316d4f61a04a6a2a5369c6'

    request({ ur, json: true }, (error,  { body }) => {
       
        
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather.description + ' It is currently ' + body.main.temp + ' degress out. It feels like ' + body.main.feels_like + 'degrees')
        }

        console.log(response)
        
    })
}

module.exports = forecast