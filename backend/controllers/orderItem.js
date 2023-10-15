const orderItemsService = require('../services/orderItems.service');

const createPayment = async (req, res) => {
    try {
        const orderItemsData = req.body;
        const savedPayment = await orderItemsService.createPayment(orderItemsData);
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error creating orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayments = async (req, res) => {
    try {
        const orderItems = await orderItemsService.getPayments();
        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const orderItems = await orderItemsService.getPaymentById(req.params.id);
        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await orderItemsService.updatePayment(req.params.id, req.body);
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error('Error updating orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePayment = async (req, res) => {
    try {
        await orderItemsService.deletePayment(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting orderItems:', error);
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
