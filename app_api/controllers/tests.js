var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getStudentTests = function(req, res) {
};

module.exports.testReadOne = function(req, res) {
  if (req.params && req.params.studentid && req.params.testid) {
    User
      .findById(req.params.studentid)
      .exec(
        function(err, student) {
          var response, test;
          if (!student) {
            sendJsonResponse(res, 404, {
              "message": "userid not found"
            });
            return;
          }
          else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          if (student.tests && student.tests.length > 0) {
            test = student.tests.id(req.params.testid);
            if (!test) {
              sendJsonResponse(res, 404, {
                "message": "testid not found"
              });
            }
            else {
              response = {
                student: {
                  name: student.firstName,
                  school: student.school,
                  birthday: student.birthday,
                  disability: student.disability,
                  grade: student.grade,
                  id: req.params.studentid
                },
                test: test
              };
              sendJsonResponse(res, 200, response);
            }
          }
          else {
            sendJsonResponse(res, 404, {
              "message": "no tests found"
            });
          }
        }
      );
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "Not found, studentid and testid are both required"
    });
  }
};

var doAddTest = function(req, res, student) {
  if(!student) {
    sendJsonResponse(res, 404, {
      "message": "studentid not found"
    });
  }
  else {
    test_hash = {
      subject: req.body.subject,
      date: req.body.date,
      gradeLevel: req.body.gradeLevel,
      type: req.body.type,
    };
    if (req.body.subject === "Writing") {
      test_hash.finished = true;
      test_hash.writingScores = {};
      test_hash.writingScores.ideas = req.body.ideas;
      test_hash.writingScores.organization = req.body.organization;
      test_hash.writingScores.voice = req.body.voice;
      test_hash.writingScores.wordChoice = req.body.wordChoice;
      test_hash.writingScores.sentenceFluency = req.body.sentenceFluency;
      test_hash.writingScores.conventions = req.body.conventions;
    }
    else {
      test_hash.finished = false;
    }
    student.tests.push(test_hash);
    student.save(function(err, student) {
      var thisTest;
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else {
        thisTest = student.tests[student.tests.length - 1];
        sendJsonResponse(res, 201, thisTest);
      }
    });
  }
};

module.exports.testCreate = function(req, res) {
  var studentid = req.params.studentid;
  if (studentid) {
    User
      .findById(studentid)
      .select('tests')
      .exec(
        function(err, student) {
          if (err) {

            sendJsonResponse(res, 400, err);
          }
          else {
            doAddTest(req, res, student);
          }
        }
      );
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "Not found"
    });
  }
};

module.exports.testUpdate = function(req, res) {};

var doDeleteTest = function(req, res, student, testid, studentid) {
  if (!student || !testid) {
    sendJsonResponse(res, 404, {
      "message": "info missing"
    });
  }
  else {
    for (var i = 0; i < student.tests.length; i++) {
      if (student.tests[i]._id.toString() === testid) {
        student.tests.splice(i, 1);
      }
    }
    student.save(function(err, student) {
      if (err) {
        sendJsonResponse(res, 404, err);
      }
      else {
        sendJsonResponse(res, 204, null);
      }
    });
  }

};

module.exports.testDelete = function(req, res) {
  var studentid = req.params.studentid;
  var testid = req.params.testid
  if (studentid) {
    User
      .findById(studentid)
      .select("tests")
      .exec(function(err, student) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        else {
          doDeleteTest(req, res, student, testid, studentid)
        }
      });
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "No studentid"
    });
  }
};
