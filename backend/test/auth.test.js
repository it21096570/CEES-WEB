const request = require('supertest');
const app = require('../server'); // Import your Express app
const mongoose = require('mongoose');

beforeAll(async () => {
    // Connect to your MongoDB or set up a test database
    await mongoose.connect('mongodb+srv://sadeepa:sadeepa123@studentmanagement.in6etp1.mongodb.net/csse_db?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Disconnect from the MongoDB and close the connection
    await mongoose.disconnect();
});

describe('User Registration and Login', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: 'johndoe@example.com',
                age: '30',
                dob: '1990-01-01',
                password: 'password123',
                role: 'user',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should reject registration with an existing email', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                firstname: 'Jane',
                lastname: 'Doe',
                email: 'johndoe@example.com', // Duplicate email
                age: '28',
                dob: '1993-02-15',
                password: 'newpassword',
                role: 'user',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    });

    it('should log in a registered user with correct credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200); // Should be 200 if login is successful
        expect(response.body).toHaveProperty('token');
        expect(response.body.role).toBe('user');
    });

    it('should reject login with incorrect password', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'wrongpassword', // Incorrect password
            });

        expect(response.status).toBe(400); // Should be 400 if login fails
        expect(response.body.message).toBe('Invalid email or password');
    });

    it('should reject login with incorrect email', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'nonexistent@example.com', // Non-existent email
                password: 'password123',
            });

        expect(response.status).toBe(400); // Should be 400 if login fails
        expect(response.body.message).toBe('Invalid email or password');
    });

    it('should reject login with missing credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                // Missing email and password
            });

        expect(response.status).toBe(400); // Should be 400 if login fails
        expect(response.body.message).toBe('Invalid email or password');
    });
});