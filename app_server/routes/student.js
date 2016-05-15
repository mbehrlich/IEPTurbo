var express = require('express');
var router = express.Router();
var ctrlStudent = require('../controllers/student');


/* GET home and test pages */
router.get('/', ctrlStudent.index);
router.get('/test', ctrlStudent.test);


module.exports = router;
