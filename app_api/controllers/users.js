var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.allUsers = function(req, res) {
  User
    .find()
    .exec(function(err, users) {
      if (!users) {
        sendJsonResponse(res, 404, {
          "message": "No users found"
        });
        return;
      }
      sendJsonResponse(res, 200, users);
    });
};

module.exports.getStudents = function(req, res) {
  User
    .find() //{"caseManager": "Krystina Ehrlich"})
    .exec(function(err, students) {
      if (!students) {
        sendJsonResponse(res, 404, {
          "message": "No students found"
        });
        return;
      }
      sendJsonResponse(res, 200, students);
    });
};

module.exports.userReadOne = function(req, res) {
  if (req.params && req.params.userid) {
    User
      .findById(req.params.userid)
      .exec(function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
          return;
        }
        sendJsonResponse(res, 200, user);
      });
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "No userid in request"
    });
  }
};

module.exports.userCreate = function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    type: "student",
    school: req.body.school,
    birthday: req.body.birthday,
    disability: req.body.disability,
    race: req.body.race,
    grade: req.body.grade,
    caseManager: req.body.caseManager,
    reference_id: 1
  }, function(err, user) {
    if (err) {
      sendJsonResponse(res, 400, err);
    }
    else {
      sendJsonResponse(res, 201, user);
    }
  });
};

module.exports.userUpdate = function(req, res) {
  if (!req.params.userid) {
    sendJsonResponse(res, 404, {
      "message": "Not found"
    });
    return;
  }
  User
    .findById(req.params.studentid)
    .select('-tests -type')
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 400, {
            "message": "userid not found"
          });
          return;
        }
        else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        user.password = req.body.password;
        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
        user.school = req.body.school;
        user.birthday = req.body.birthdate;
        user.disability = req.body.disability;
        user.race = req.body.race;
        user.grade = req.body.grade;
        user.caseManager = req.body.caseManager;
        user.save(function(err, user) {
          if (err) {
            sendJsonResponse(res, 404, err);
          }
          else {
            sendJsonResponse(res, 200, user);
          }
        });
      }
    );
};

module.exports.userDelete = function(req, res) {
  var userid = req.params.userid;
  if (userid) {
    User
      .findByIdAndRemove(userid)
      .exec(function(err, user) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "No userid"
    });
  }
};
