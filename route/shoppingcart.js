const express = require('express');
const { route } = require('./html');
const { rightOuterJoin } = require('../model/database');

const router = express.Router();

router.get('/generateUniqueId',require('../controller/shoppingcart').generateCartId);

router.post('/add',require('../controller/shoppingcart').addToCart);

router.get('/:cart_id',require('../controller/shoppingcart').getCart);

router.put('/update/:cart_id/:item_id',require('../controller/shoppingcart').updateCart);

router.delete('/empty/:cart_id',require('../controller/shoppingcart').deleteCart);

router.get('/moveToCart/:cart_id/:item_id',require('../controller/shoppingcart').moveToCart);

router.get('/totalAmount/:cart_id',require('../controller/shoppingcart').totalAmount);

router.get('/saveForLater/:cart_id/:item_id',require('../controller/shoppingcart').saveForLater);

router.get('/getSaved/:cart_id',require('../controller/shoppingcart').getSavedProducts);

router.delete('/removeProduct/:cart_id/:item_id',require('../controller/shoppingcart').removeProduct);

module.exports = router;