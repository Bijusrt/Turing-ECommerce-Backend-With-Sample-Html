const express = require('express');

const router = express.Router();


router.get('',require('../controller/tax').getAllTax);

router.get('/:tax_id',require('../controller/tax').getTaxById);


module.exports = router;