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
router.post('/students/:studentid/edit', ctrlMain.updateStudent);

/* GET teacher pages for tests */
router.get('/students/:studentid/tests/new', ctrlMain.addTest);
router.post('/students/:studentid/tests/new', ctrlMain.doAddTest);
router.get('/students/:studentid/tests/:testid', ctrlMain.test);
router.delete('/students/:studentid/tests/:testid', ctrlMain.deleteTest);
router.get('/students/:studentid/tests/:testid/edit', ctrlMain.editTest);
router.delete('/students/:studentid/tests/:testid/edit', ctrlMain.deleteTest);

/* GET other pages */
router.get('/about', ctrlMain.about);

module.exports = router;
