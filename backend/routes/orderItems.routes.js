const express = require('express');
const orderItemsController = require('../controllers/orderItems.controller');

const router = express.Router();

router.post('/createOrder', orderItemsController.createOrder);
router.get('/getAllOrders', orderItemsController.getOrders);
router.get('/getOneOrder/:id', orderItemsController.getOrderById);
router.put('/updateOrder/:id', orderItemsController.updateOrder);
router.delete('/deleteOrder/:id', orderItemsController.deleteOrder);

module.exports = router;