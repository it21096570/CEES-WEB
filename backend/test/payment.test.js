const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('Payment API Endpoints', () => {
    let paymentId; // Store the ID of the created payment for subsequent tests

    // Test creating a payment
    it('should create a new payment', async () => {
        const res = await request(app)
            .post('/createPayment')
            .send({
                amount: '100.00',
                orderid: '12345',
                cardno: '**** **** **** 1234',
                date: '2023-01-01',
                paymentstatus: 'Paid',
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        paymentId = res.body._id; // Store the ID for future tests
    });

    // Test fetching all payments
    it('should get all payments', async () => {
        const res = await request(app).get('/getAllPayments');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Test fetching a specific payment by ID
    it('should get a payment by ID', async () => {
        const res = await request(app).get(`/getOnePayment/${paymentId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', paymentId);
    });

    // Test updating a payment
    it('should update a payment', async () => {
        const updatedAmount = '200.00';
        const res = await request(app)
            .put(`/updatePayment/${paymentId}`)
            .send({ amount: updatedAmount });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('amount', updatedAmount);
    });

    // Test deleting a payment
    it('should delete a payment', async () => {
        const res = await request(app).delete(`/deletePayment/${paymentId}`);
        expect(res.statusCode).toBe(204);
    });
});
