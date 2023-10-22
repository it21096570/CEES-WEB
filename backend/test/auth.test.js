// Import required modules and services
const AuthService = require('../services/auth.service');
const UserFactory = require('../factory/auth.factory');
const User = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');
const googleauth = require('../middleware/auth.middleware');

// Mocking dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('../factory/auth.factory');
jest.mock('../models/auth.model');
jest.mock('../middleware/auth.middleware');

describe('Authentication Service', () => {
    // Test Case 1: Register a User
    it('should register a user', async () => {
        // Mock UserFactory.create
        UserFactory.createUser.mockResolvedValue({ success: true, message: 'User registered successfully' });

        // Prepare user data
        const userData = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            age: '30',
            dob: '1990-01-01',
            password: 'password123',
            role: 'user',
        };

        // Call the registerUser function and test the result
        const result = await AuthService.registerUser(userData);

        // Expectations
        expect(result.success).toBe(true);
        expect(result.message).toBe('User registered successfully');
        expect(UserFactory.createUser).toHaveBeenCalledWith(userData);
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });

    // Test Case 2: Attempt to Register an Existing User
    it('should fail to register an existing user', async () => {
        // Mock UserFactory.findUserByEmail
        UserFactory.findUserByEmail.mockResolvedValue({ email: 'janedoe@example.com' });

        // Prepare user data for an existing user
        const existingUserData = {
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'janedoe@example.com',
            age: '25',
            dob: '1995-01-01',
            password: 'password456',
            role: 'user',
        };

        // Try to register the same user again
        const result = await AuthService.registerUser(existingUserData);

        // Expectations
        expect(result.error).toBe('User already exists');
        expect(UserFactory.findUserByEmail).toHaveBeenCalledWith('janedoe@example.com');
    });

    // Test Case 3: Log in a User
    it('should log in a user', async () => {
        // Mock UserFactory.findUserByEmail and bcrypt.compare
        UserFactory.findUserByEmail.mockResolvedValue({
            email: 'johndoe@example.com',
            password: 'hashedPassword123',
            role: 'user',
        });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fakeToken');

        // Prepare login data
        const loginData = {
            email: 'johndoe@example.com',
            password: 'password123',
        };

        // Call the loginUser function and test the result
        const result = await AuthService.loginUser(loginData);

        // Expectations
        expect(result.success).toBe(true);
        expect(result.token).toBe('fakeToken');
        expect(result.role).toBe('user');
        expect(UserFactory.findUserByEmail).toHaveBeenCalledWith('johndoe@example.com');
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
        expect(jwt.sign).toHaveBeenCalledWith({ userId: 'fakeUserId' }, config.secretKey);
    });

    // Write similar test cases for other functions like getDetails, updateUser, deleteUser, etc.

    // Test Case 4: Get User Details
    it('should get user details', async () => {
        // Mock UserFactory.findUserById
        UserFactory.findUserById.mockResolvedValue({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            age: '30',
            dob: '1990-01-01',
            role: 'user',
        });

        // Call the getDetails function with a valid user ID and test the result
        const result = await AuthService.getDetails('fakeUserId');

        // Expectations
        expect(result.success).toBe(true);
        expect(result.user).toEqual({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            age: '30',
            dob: '1990-01-01',
            role: 'user',
        });
        expect(UserFactory.findUserById).toHaveBeenCalledWith('fakeUserId');
    });

    // Test Case 5: Update User Information
    it('should update user information', async () => {
        // Mock UserFactory.updateUser
        UserFactory.updateUser.mockResolvedValue({
            firstname: 'Updated John',
            lastname: 'Updated Doe',
            age: '35',
            dob: '1990-01-02',
            role: 'user',
        });

        // Call the updateUser function with a valid user ID and updated data
        const result = await AuthService.updateUser('fakeUserId', {
            firstname: 'Updated John',
            lastname: 'Updated Doe',
            age: '35',
            dob: '1990-01-02',
        });

        // Expectations
        expect(result.success).toBe(true);
        expect(result.message).toBe('User updated successfully');
        expect(UserFactory.updateUser).toHaveBeenCalledWith('fakeUserId', {
            firstname: 'Updated John',
            lastname: 'Updated Doe',
            age: '35',
            dob: '1990-01-02',
        });
    });

    // Test Case 6: Delete User
    it('should delete a user', async () => {
        // Mock UserFactory.deleteUser
        UserFactory.deleteUser.mockResolvedValue({ success: true, message: 'User deleted successfully' });

        // Call the deleteUser function with a valid user ID
        const result = await AuthService.deleteUser('fakeUserId');

        // Expectations
        expect(result.success).toBe(true);
        expect(result.message).toBe('User deleted successfully');
        expect(UserFactory.deleteUser).toHaveBeenCalledWith('fakeUserId');
    });

    // Test Case 7: Check Old Password
    it('should check the old password and update it', async () => {
        // Mock UserFactory.findUserByEmail and bcrypt.compare
        UserFactory.findUserByEmail.mockResolvedValue({
            _id: 'fakeUserId',
            email: 'johndoe@example.com',
            password: 'hashedOldPassword',
        });
        bcrypt.compare.mockResolvedValue(true);
        bcrypt.hash.mockResolvedValue('hashedNewPassword');
        User.findByIdAndUpdate.mockResolvedValue(true);

        // Prepare data for checking old password and updating it
        const passwordData = {
            email: 'johndoe@example.com',
            password: 'newPassword123',
            oldPassword: 'oldPassword123',
        };

        // Call the checkOldPassword function and test the result
        const result = await AuthService.checkOldPassword(passwordData);

        // Expectations
        expect(result.success).toBe(true);
        expect(UserFactory.findUserByEmail).toHaveBeenCalledWith('johndoe@example.com');
        expect(bcrypt.compare).toHaveBeenCalledWith('oldPassword123', 'hashedOldPassword');
        expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
        expect(UserFactory.updateUser).toHaveBeenCalledWith('fakeUserId', { password: 'hashedNewPassword' });
    });

    // Test Case 8: Send Verification Key
    it('should send a verification key to the user', async () => {
        // Mock UserFactory.findUserByEmail
        UserFactory.findUserByEmail.mockResolvedValue({
            email: 'johndoe@example.com',
        });

        // Mock nodemailer transporter sendMail
        const sendMailMock = jest.fn((options, callback) => {
            callback(null, 'Email sent successfully');
        });
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

        // Prepare data for sending a verification key
        const verificationData = {
            email: 'johndoe@example.com',
            key: '123456',
        };

        // Call the sendVerificationKey function and test the result
        const result = await AuthService.sendVerificationKey(verificationData);

        // Expectations
        expect(result.success).toBe(true);
        expect(sendMailMock).toHaveBeenCalledWith(
            {
                from: 'medixoehealth@gmail.com',
                to: 'johndoe@example.com',
                subject: 'Appointment details',
                text: 'Dear User Your Verification Code Is 123456 please enter this given Box',
            },
            expect.any(Function)
        );
    });

    // Test Case 9: Change Password
    it('should change the user password', async () => {
        // Mock UserFactory.findUserByEmail and bcrypt.hash
        UserFactory.findUserByEmail.mockResolvedValue({
            _id: 'fakeUserId',
            email: 'johndoe@example.com',
        });
        bcrypt.hash.mockResolvedValue('hashedNewPassword');
        User.findByIdAndUpdate.mockResolvedValue(true);

        // Prepare data for changing the user password
        const passwordData = {
            email: 'johndoe@example.com',
            password: 'newPassword123',
        };

        // Call the changePassword function and test the result
        const result = await AuthService.changePassword(passwordData);

        // Expectations
        expect(result.success).toBe(true);
        expect(UserFactory.findUserByEmail).toHaveBeenCalledWith('johndoe@example.com');
        expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
        expect(UserFactory.updateUser).toHaveBeenCalledWith('fakeUserId', { password: 'hashedNewPassword' });
    });

    // Test Case 10: Initialize Google Auth Routes
    it('should initialize Google authentication routes', () => {
        const app = {
            get: jest.fn(),
        };
        const passport = {
            authenticate: jest.fn(),
        };
        const req = {};
        const res = {
            send: jest.fn(),
            json: jest.fn(),
        };

        // Mock passport.authenticate
        passport.authenticate.mockImplementation((strategy, options, callback) => {
            return (req, res, next) => {
                callback(req, res, next);
            };
        });

        // Set up necessary mocks and data for Google authentication routes
        googleauth.googleAuthenticate.mockImplementation((req, res, next) => {
            req.isAuthenticated = jest.fn(() => true);
            next();
        });

        // Call the initializeGoogleAuthRoutes function
        AuthService.initializeGoogleAuthRoutes(app, passport);

        // Expectations
        expect(app.get).toHaveBeenCalledTimes(3);
        expect(app.get).toHaveBeenCalledWith('/auth/google', expect.any(Function));
        expect(app.get).toHaveBeenCalledWith('/auth/google/callback', expect.any(Function));
        expect(app.get).toHaveBeenCalledWith('/api/is-authenticated', expect.any(Function));
        expect(passport.authenticate).toHaveBeenCalledTimes(2);
        expect(req.isAuthenticated()).toBe(true);

        // Simulate the '/auth/google/callback' route
        req.user = { _id: 'fakeUserId', role: 'user' };
        AuthService.initializeGoogleAuthRoutes(app, passport);
        const expectedToken = jwt.sign({ userId: 'fakeUserId' }, config.secretKey);
        const expectedRole = 'user';
        expect(res.send).toHaveBeenCalledWith(expect.any(String));
        expect(res.json).toHaveBeenCalledWith({ token: expectedToken, role: expectedRole });
    });
});
