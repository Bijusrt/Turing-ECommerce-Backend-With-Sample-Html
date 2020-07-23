const express = require('express');

const router = express.Router();

const middleware = require('../model/tokenverfication');



router.get('/',require('../controller/product').allProduct);

router.get('/search',require('../controller/product').productSearch);

router.get('/:product_id',require('../controller/product').product_id);

router.get('/inCategory/:category_id',require('../controller/product').inCategory);

router.get('/inDepartment/:department_id',require('../controller/product').inDepartment);

router.get('/:product_id/details',require('../controller/product').details);

router.get('/:product_id/locations',require('../controller/product').locations);

router.get('/:product_id/reviews',require('../controller/product').reviews);

router.post('/product_id/reviews',middleware,require('../controller/product').post_reviews);



module.exports = router;