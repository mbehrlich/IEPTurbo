var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  subject: {type: String, required: true},
  gradeLevel: {type: String, required: true},
  standard: {type: String, required: true},
  type: {type: String, required: true},
  text: {type: String, required: true},
  image: String,
  answer: {type: String, required: true},
  option1: String,
  option2: String,
  option3: String,
  option4: String
});

mongoose.model('Item', itemSchema);
