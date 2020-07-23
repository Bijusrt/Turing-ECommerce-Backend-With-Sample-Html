const express = require('express');

const router = express.Router();


router.get('',require('../controller/shipping').shippingRegions);

router.get('/:shipping_region_id',require('../controller/shipping').getByShippingRegionId);


module.exports = router;