const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZG9sYXBvIiwiYSI6ImNrbmVxZDR1cDF1NTQycG11djR1OXl1ejAifQ.ih3JuXcfpIpbl7DcFkA_sw'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to fetch result', undefined)

        } else if (body.features.length === 0) {
            callback('Unable to fetch location. Try again', undefined)

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                logitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode