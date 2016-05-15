var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');


/* GET teacher pages */
router.get('/', ctrlMain.index);
router.get('/students/student', ctrlMain.student);
router.get('/students/new', ctrlMain.addStudent);
router.get('/students/student/edit', ctrlMain.editStudent);

/* GET teacher pages for tests */
router.get('/students/student/tests/test', ctrlMain.test);
router.get('/students/student/tests/new', ctrlMain.addTest);
router.get('/students/student/tests/test/edit', ctrlMain.editTest);

/* GET other pages */
router.get('/about', ctrlMain.about);

module.exports = router;
