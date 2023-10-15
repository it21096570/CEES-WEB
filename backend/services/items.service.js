const items = require('../models/items.model');
const itemsFactory = require('../factory/items.factory');

const createitems = async (data) => {
    try {
        const items = itemsFactory.createitems(data);
        const saveditems = await items.save();
        return saveditems;
    } catch (error) {
        console.error('Error creating items:', error);
        throw new Error('items creation failed');
    }
};

const getitemss = async () => {
    try {
        const items = await items.find();
        return items;
    } catch (error) {
        console.error('Error fetching itemss:', error);
        throw new Error('Fetching itemss failed');
    }
};

const getitemsById = async (id) => {
    try {
        const items = await items.findById(id);
        if (!items) {
            throw new Error('items not found');
        }
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw new Error('Fetching items failed');
    }
};

const updateitems = async (id, data) => {
    try {
        const updateditems = await items.findByIdAndUpdate(id, data, { new: true });
        if (!updateditems) {
            throw new Error('items not found');
        }
        return updateditems;
    } catch (error) {
        console.error('Error updating items:', error);
        throw new Error('items update failed');
    }
};

const deleteitems = async (id) => {
    try {
        const items = await items.findById(id);
        if (!items) {
            throw new Error('items not found');
        }
        await items.remove();
    } catch (error) {
        console.error('Error deleting items:', error);
        throw new Error('items deletion failed');
    }
};

module.exports = {
    createitems,
    getitemss,
    getitemsById,
    updateitems,
    deleteitems,
};
