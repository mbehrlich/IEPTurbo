var express = require('express');
var router = express.Router();
var ctrlAdmin = require('../controllers/admin');


/* GET User lists */
router.get('/', ctrlAdmin.index);
router.get('/users/user', ctrlAdmin.user);
router.get('/users/new', ctrlAdmin.addUser);
router.get('/users/user/edit', ctrlAdmin.editUser);


module.exports = router;
