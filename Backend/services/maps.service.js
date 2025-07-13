const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGlE_MAPS_API;
    const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';

    const response = await axios.get(endpoint, {
        params: {
            address: address,
            key: apiKey
        }
    });

    if (
        response.data.status === 'OK' &&
        response.data.results &&
        response.data.results.length > 0
    ) {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, longitude: location.lng };
    } else {
        throw new Error('Unable to fetch coordinates for the given address');
    }
}