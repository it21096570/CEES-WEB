const Inventory = require('../models/inventory.model');

// Factory function to create a new Item instance
const createInventory = (data) => {
    return new Inventory(data);
};

module.exports = {
    createInventory,
};