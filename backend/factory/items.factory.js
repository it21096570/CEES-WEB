const Item = require('../models/items.model');

// Factory function to create a new Item instance
const createItem = (data) => {
    return new Item(data);
};

module.exports = {
    createItem,
};
