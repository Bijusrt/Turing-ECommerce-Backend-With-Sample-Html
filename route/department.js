const express = require('express');

const router = express.Router();



router.get('/',require('../controller/department').allDepartment);

router.get('/department_id',require('../controller/department').department_id);



module.exports = router;