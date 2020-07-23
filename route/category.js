const express = require('express');

const router = express.Router();



router.get("/",require('../controller/category').allCategory);

router.get("/id",require('../controller/category').category_id);

router.get("/inProduct/product_id",require('../controller/category').inProduct);

router.get("/inDepartment/department_id",require('../controller/category').inDepartment);



module.exports = router;