const inventory = require('../models/inventory.model');
const inventoryFactory = require('../factory/inventory.factory');

const createinventory = async (data) => {
    try {
        const inventory = inventoryFactory.createinventory(data);
        const savedinventory = await inventory.save();
        return savedinventory;
    } catch (error) {
        console.error('Error creating inventory:', error);
        throw new Error('inventory creation failed');
    }
};

const getinventory = async () => {
    try {
        const inventory = await inventory.find();
        return inventory;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw new Error('Fetching inventory failed');
    }
};

const getinventoryById = async (id) => {
    try {
        const inventory = await inventory.findById(id);
        if (!inventory) {
            throw new Error('inventory not found');
        }
        return inventory;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw new Error('Fetching inventory failed');
    }
};

const updateinventory = async (id, data) => {
    try {
        const updatedinventory = await inventory.findByIdAndUpdate(id, data, { new: true });
        if (!updatedinventory) {
            throw new Error('inventory not found');
        }
        return updatedinventory;
    } catch (error) {
        console.error('Error updating inventory:', error);
        throw new Error('inventory update failed');
    }
};

const deleteinventory = async (id) => {
    try {
        const inventory = await inventory.findById(id);
        if (!inventory) {
            throw new Error('inventory not found');
        }
        await inventory.remove();
    } catch (error) {
        console.error('Error deleting inventory:', error);
        throw new Error('inventory deletion failed');
    }
};

module.exports = {
    createinventory,
    getinventory,
    getinventoryById,
    updateinventory,
    deleteinventory,
};
