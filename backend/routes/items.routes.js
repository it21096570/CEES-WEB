const express = require('express');
const itemController = require('../controllers/order.controller');

const router = express.Router();

router.post('/createItem', itemController.createItem);
router.get('/getAllItems', itemController.getItems);
router.get('/getOneItem/:id', itemController.getItemById);
router.put('/updateItem/:id', itemController.updateItem);
router.delete('/deleteItem/:id', itemController.deleteItem);

module.exports = router;