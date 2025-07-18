const axios = require('axios');
const captainModel = require('../models/captain.model');

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
        return { lat: location.lat, lng: location.lng };
    } else {
        throw new Error('Unable to fetch coordinates for the given address');
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API; // Use the correct env variable name
    const url = "https://maps.googleapis.com/maps/api/distancematrix/json";

    try {
        const response = await axios.get(url, {
            params: {
                origins: origin,
                destinations: destination,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === "ZERO_RESULTS") {
                throw new Error('No routes found');
            }
            // Return distance and duration
            return {
                distance: element.distance.text, // e.g., "5.6 km"
                duration: element.duration.text, // e.g., "12 mins"
                distanceValue: element.distance.value, // in meters
                durationValue: element.duration.value  // in seconds
            };
        } else {
            throw new Error("Unable to fetch distance and time");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error("query is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const endpoint = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

    try {
        const response = await axios.get(endpoint, {
            params: {
                input: input,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            return response.data.predictions;
            // return response.data.predictions.map(prediction => ({
            //     description: prediction.description,
            //     place_id: prediction.place_id
            // }));
        } else {
            throw new Error('Unable to fetch autocomplete suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (lat , lng , radius) =>{
    // radius in km 6371
    // radius in miles 3963.2
    const captains = await captainModel.find({
        location: {
            $geoWithin:{
                $centerSphere: [[lat , lng], radius/6371]
            }
        }
    });

    return captains;
}