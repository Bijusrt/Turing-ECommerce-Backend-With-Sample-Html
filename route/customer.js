const express = require('express');

const router = express.Router();

const middleware = require('../model/tokenverfication');



router.put('',middleware,require('../controller/customer').updateUser);

router.get('',middleware,require('../controller/customer').getUser);

router.post('',require('../controller/customer').newUser);

router.post('/login',require('../controller/customer').userLogin);

router.post('/facebook',require('../controller/customer').facebook);

router.put('/address',middleware,require('../controller/customer').address);

router.put('/creditCard',middleware,require('../controller/customer').creditCard);



module.exports = router;