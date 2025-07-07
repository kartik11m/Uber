const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname, lastname, email, password, color , plate , capacity , vehicleType}) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = new captainModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    try {
    await captain.save();
    return captain;
} catch (error) {
    throw new Error('Failed to create captain: ' + error.message);
}
}