const request = require('postman-request')

const forecast = (lat,long,callback) => {
    $weatherapi = 'http://api.weatherstack.com/current?access_key=34a400a508539e26fbec1a025bafaf14&query='+lat+','+long

    request($weatherapi, (error,response,body) => {
        if(error){
            callback('error',undefined)
        }else if(!error && response.statusCode == 200){
            const report = JSON.parse(body)
            callback(undefined,
                {
                    localtime: report.location.localtime, 
                    temperature: report.current.temperature,
                    weather_icons: report.current.weather_icons,
                    weather_desc: report.current.weather_descriptions,
                    feels_like: report.current.feelslike,
                    humidity: report.current.humidity
                }
                )
        }
    })
}

module.exports = forecast