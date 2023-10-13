const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    itemname: {
        type: String,
        required: true
    },
    unitprice: {
        type: double,
        required: true
    }

}, {
    timestamps: true
})

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;