var express = require('express');
var router = express.Router();
var ctrlWriter = require('../controllers/writer');


/* GET item pages */
router.get('/', ctrlWriter.index);
router.get('/items/item', ctrlWriter.item);
router.get('/items/new', ctrlWriter.addItem);
router.get('/items/item/edit', ctrlWriter.editItem);


module.exports = router;
