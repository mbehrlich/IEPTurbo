var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
  ideas: Number,
  organization: Number,
  voice: Number,
  WordChoice: Number,
  SentenceFluency: Number,
  Conventions: Number
});

var testSchema = new mongoose.Schema({
  subject: {type: String, required: true},
  date: {type: Date, required: true},
  gradeLevel: {type: String, required: true},
  score: {type: Number, "default": 0},
  finished: {type: Boolean, "default": false},
  type: {type: String, required: true},
  writingScores: scoreSchema
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  hash: String,
  salt: String,
  lastName: {type: String, required: true},
  firstName: {type: String, required: true},
  type: {type: String, required: true},
  school: String,
  birthday: Date,
  disability: String,
  race: String,
  grade: String,
  caseManager: String,
  tests: [testSchema]
});

mongoose.model('User', userSchema);
