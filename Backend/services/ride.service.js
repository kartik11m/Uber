const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // distanceTime: { distance, duration, distanceValue, durationValue }
    // Convert meters to km, seconds to min
    const distance = distanceTime.distanceValue / 1000; // km
    const duration = distanceTime.durationValue / 60;   // min

    // Example fare calculation logic
    const baseFare = {
        car: 50,
        auto: 30,
        bike: 20
    };
    const perKmRate = {
        car: 15,
        auto: 10,
        bike: 7
    };
    const perMinRate = {
        car: 2,
        auto: 1.5,
        bike: 1
    };

    return {
        car: Math.floor(baseFare.car + (perKmRate.car * distance) + (perMinRate.car * duration)),
        auto: Math.floor(baseFare.auto + (perKmRate.auto * distance) + (perMinRate.auto * duration)),
        bike: Math.floor(baseFare.bike + (perKmRate.bike * distance) + (perMinRate.bike * duration)),
        distanceValue: distanceTime.distanceValue / 1000,
        durationValue: distanceTime.durationValue / 60
    };
}

module.exports.getFare = getFare;

function getOtp(num){
    // Use crypto for secure random OTP generation with num digits
    function generateOtp(num){
        const max = Math.pow(10, num);
        const otp = crypto.randomInt(0, max).toString().padStart(num, '0');
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fareData = await getFare(pickup, destination);

    // console.log(fareData);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fareData[vehicleType],
        distance: fareData.distanceValue, // in meters
        duration: fareData.durationValue  // in seconds
    });

    return ride;
}

