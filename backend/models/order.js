const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    ordername: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true
    },
    total: {
        type: double,
        required: true
    },
    approvestatus: {
        type: double,
        required: true
    },

}, {
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;