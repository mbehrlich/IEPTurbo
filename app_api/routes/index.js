var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlItems = require('../controllers/items');
var ctrlTests = require('../controllers/tests');

// users
router.get('/users', ctrlUsers.allUsers);
router.get('/users/:userid/students', ctrlUsers.getStudents);
router.get('/users/:userid', ctrlUsers.userReadOne);
router.post('/users', ctrlUsers.userCreate);
router.put('/users/:userid', ctrlUsers.userUpdate);
router.delete('/users/:userid', ctrlUsers.userDelete);

// items
router.get('/items', ctrlItems.allItems);
router.get('/items/:itemid', ctrlItems.itemReadOne);
router.post('/items', ctrlItems.itemCreate);
router.put('/items/:itemid', ctrlItems.itemUpdate);
router.delete('/items/:itemid', ctrlItems.itemDelete);

// tests
router.get('/:studentid/tests', ctrlTests.getStudentTests);
router.get('/:studentid/tests/:testid', ctrlTests.testReadOne);
router.post('/:studentid/tests', ctrlTests.testCreate);
router.put('/:studentid/tests/:testid', ctrlTests.testUpdate);
router.delete('/:studentid/tests/:testid', ctrlTests.testDelete);

module.exports = router;
