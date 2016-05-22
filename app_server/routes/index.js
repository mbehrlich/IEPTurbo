var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');


/* GET teacher pages */
router.get('/', ctrlMain.index);
router.get('/students/new', ctrlMain.addStudent);
router.post('/students/new', ctrlMain.doAddStudent);
router.get('/students/:studentid', ctrlMain.student);
router.delete('/students/:studentid', ctrlMain.deleteStudent);
router.get('/students/:studentid/edit', ctrlMain.editStudent);

/* GET teacher pages for tests */
router.get('/students/:studentid/tests/test', ctrlMain.test);
router.get('/students/:studentid/tests/new', ctrlMain.addTest);
router.get('/students/:studentid/tests/test/edit', ctrlMain.editTest);

/* GET other pages */
router.get('/about', ctrlMain.about);

module.exports = router;
