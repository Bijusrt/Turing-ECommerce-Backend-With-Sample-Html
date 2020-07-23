const express = require('express');
const { Router } = require('express');

const router = express.Router();



router.get('/',require('../controller/attribute').allAttribute);

router.get('/:attribute_id',require('../controller/attribute').attribute_id);

router.get('/values/:attribute_id',require('../controller/attribute').values);

router.get('/inProduct/:product_id',require('../controller/attribute').inProduct);



module.exports = router;