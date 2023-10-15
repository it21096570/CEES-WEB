const orderService = require('../services/order.service');

const createPayment = async (req, res) => {
    try {
        const orderData = req.body;
        const savedPayment = await orderService.createPayment(orderData);
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayments = async (req, res) => {
    try {
        const order = await orderService.getPayments();
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const order = await orderService.getPaymentById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await orderService.updatePayment(req.params.id, req.body);
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePayment = async (req, res) => {
    try {
        await orderService.deletePayment(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};
