const express = require('express');

const router = express.Router();

const middleware = require('../model/tokenverfication');


router.post('',middleware,require('../controller/order').createOrder);

router.get('/inCustomer',middleware,require('../controller/order').getOrderByCustomerToken);

router.get('/:order_id',middleware,require('../controller/order').getOrderById);

router.get('/shortDetail/:order_id',middleware,require('../controller/order').orderInfo);


module.exports = router;