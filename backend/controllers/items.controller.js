const itemsService = require('../services/items.service');

const createPayment = async (req, res) => {
    try {
        const itemsData = req.body;
        const savedPayment = await itemsService.createPayment(itemsData);
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error creating items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayments = async (req, res) => {
    try {
        const items = await itemsService.getPayments();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const items = await itemsService.getPaymentById(req.params.id);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await itemsService.updatePayment(req.params.id, req.body);
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePayment = async (req, res) => {
    try {
        await itemsService.deletePayment(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting items:', error);
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
