const request = require('postman-request')

const geocode = (location,callback) => {

    $location = 'http://api.positionstack.com/v1/forward?access_key=77a5bcdd3cce0cbd88c041c2378ef61b&query='+location+'&limit=1'

    request($location, (error, response, body) => {
        if(error){
            callback('Error',undefined)
        }else if(!error && response.statusCode == 200){
            const locs = JSON.parse(body)
            if(locs.data.length > 0){
                callback(undefined, {
                    latitude : locs.data[0].latitude,
                    longitude : locs.data[0].longitude,
                    location : locs.data[0].label
                })
            }else{
                callback('Invalid Location',undefined)
            }
        }else{
            callback('Invalid Location',undefined)
        }
    })

}

module.exports = geocode

