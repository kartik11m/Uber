const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');

module.exports.registerCaptain = async (req, res, next) => {
    // console.log('Incoming body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname , email, password, vehicle} = req.body;
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ message: 'Captain registered successfully',token, captain });
}