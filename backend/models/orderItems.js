const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const OrderItemsSchema = new Schema({

    orderid: {
        type: number,
        required: true
    },
    itemid: {
        type: number,
        required: true
    },
    qty: {
        type: number,
        required: true
    },
   

}, {
    timestamps: true
})

const OrderItems = mongoose.model("OrderItems", OrderItemsSchema);

module.exports = OrderItems;