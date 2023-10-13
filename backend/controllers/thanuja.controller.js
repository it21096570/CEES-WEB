
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
//import nodemailer
const nodemailer = require('nodemailer');
const Thanuja = require('../models/thanuja');

// Try creating an instance of the model
const thanujaInstance = new Thanuja({ username: 'example', email: 'example@example.com', password: 'password' });

const register = async (req, res) => {
    const { firstname, lastname, email, age, dob, password, role } = req.body;

    console.log(firstname)

    try {
        // Check if user already exists
        const existingUser = await Thanuja.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await Thanuja.create({ firstname, lastname, email, age, dob, password: hashedPassword, role });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    register,

};
