const express = require('express');

const router = express.Router();



router.get('',require('../controller/html').home);

router.get('/department',require('../controller/html').department);

router.get('/category',require('../controller/html').category);



module.exports = router;