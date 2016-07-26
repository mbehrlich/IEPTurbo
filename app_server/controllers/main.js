var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://boiling-fortress-24821.herokuapp.com";
}

/* Error handling */
var _showError = function(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "We can't find this page. Sorry";
  }
  else {
    title = status + ", something's gone wrong";
    content = status + " There is an error on this page";
  }
  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
};

/*GET home page */
var renderHomepage = function(req, res) {
  res.render('student-list', {
    title: 'IEP-Turbo - IEPs made easy',
    pageHeader: {
      title: 'IEP Turbo',
      strapline: 'IEP goals made fast and easy!'
    }
  });
};

/* var renderHomepage = function(req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  }
  else if (!responseBody.length) {
    message = "No places found nearby";
  }
  res.render('student-list', {
    title: 'IEP-Turbo - IEPs made easy',
    pageHeader: {
      title: 'IEP Turbo',
      strapline: 'IEP goals made fast and easy!'
    },
    students: responseBody,
    message: message
  });
}; */

module.exports.index = function(req, res) {
  renderHomepage(req, res);
};

/*  var path = '/api/users/0/students';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderHomepage(req, res, body);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
}; */

/*GET student page */
var renderStudentPage = function(req, res, studentInfo) {
  var message;
  var birthday = new Date(studentInfo.birthday);
  if (studentInfo.tests.length === 0) {
    message = "No tests found";
  }
  res.render('student-info', {
    title: studentInfo.firstName + " " + studentInfo.lastName,
    pageHeader: {title: studentInfo.firstName + " " + studentInfo.lastName},
    student: studentInfo,
    birth_day: (birthday.getUTCMonth()+1) + '/' + birthday.getUTCDate() + '/' + birthday.getUTCFullYear(),
    age: (new Date(new Date() - birthday)).getFullYear() - 1970,
    message: message
  });
};

module.exports.student = function(req, res) {
  var path = "/api/users/" + req.params.studentid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderStudentPage(req, res, body);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/*GET add student page */
module.exports.addStudent = function(req, res) {
  res.render('add-student', {title: 'Add a new student'});
};

/*POST add student page */
module.exports.doAddStudent = function(req, res) {
  var path = "/api/users";
  var postdata = {
    username: req.body.username,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    type: "student",
    school: req.body.school,
    birthday: req.body.birthdate,
    disability: req.body.disability,
    race: req.body.race,
    grade: req.body.grade,
    caseManager: req.body.caseManager,
    reference_id: 1
  };
  var requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 201) {
      res.redirect('/');
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/*GET edit student page */
var renderEditStudentPage = function(req, res, studentInfo) {
  var birthday = (new Date(studentInfo.birthday)).toJSON().substring(0, 10);
  res.render('edit-student', {
    title: "Edit " + studentInfo.firstName + " " + studentInfo.lastName,
    pageHeader: {title: studentInfo.firstName + " " + studentInfo.lastName},
    student: studentInfo,
    birthday: birthday
  });
};

module.exports.editStudent = function(req, res) {
  var path = "/api/users/" + req.params.studentid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderEditStudentPage(req, res, body);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

module.exports.updateStudent = function(req, res) {
  var path = "/api/users/" + req.params.studentid;
  var postdata = {
    username: req.body.username,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    school: req.body.school,
    birthday: req.body.birthdate,
    disability: req.body.disability,
    race: req.body.race,
    grade: req.body.grade,
    caseManager: req.body.caseManager,
    reference_id: 1
  };
  var requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: postdata
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      res.redirect('/students/' + req.params.studentid);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/*DELETE student*/
module.exports.deleteStudent = function(req, res) {
  var path = '/api/users/' + req.params.studentid;
  var requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode !== 204) {
      _showError(req, res, response.statusCode);
      res.sendStatus(response.statusCode);
    }
    else {
      res.sendStatus(204);
    }
  });
};

/*GET test page */
var renderTestPage = function(req, res, data) {
  if (data.test.finished) {
    res.render('test-info', {
      title: "Results",
      pageHeader: {title: "Results"},
      data: data
    });
  }
  else {
    res.redirect('/students/' + data.student.id + '/tests/' + data.test._id + '/edit');
  }
};

module.exports.test = function(req, res) {
  var path = '/api/' + req.params.studentid + '/tests/' + req.params.testid;
  var requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderTestPage(req, res, body);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/*GET add test page */
var renderAddTestPage = function(req, res, studentInfo) {
  res.render('add-test', {
    title: "Add a test for " + studentInfo.firstName + " " + studentInfo.lastName,
    pageHeader: {title: "Add a test for " + studentInfo.firstName + " " + studentInfo.lastName},
    student: studentInfo
  });
};

module.exports.addTest = function(req, res) {
  var path = "/api/users/" + req.params.studentid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderAddTestPage(req, res, body);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/*POST add test page */
module.exports.doAddTest = function(req, res) {
  var path = "/api/" + req.params.studentid + "/tests";
  var postdata = {
    subject: req.body.subject,
    date: new Date(),
    gradeLevel: req.body.gradeLevel,
    type: "primary",
    writingScores: {
      ideas: req.body.ideas,
      organization: req.body.organization,
      voice: req.body.voice,
      wordChoice: req.body.wordChoice,
      sentenceFluency: req.body.sentenceFluency,
      conventions: req.body.conventions
    }
  };
  var requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 201) {
      res.redirect('/students/' + req.params.studentid);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/*GET edit a test page */
var renderEditTestPage = function(req, res, data) {
  res.render('edit-test', {
    title: "Edit test",
    pageHeader: {title: "Edit test"},
    data: data
  });
};

module.exports.editTest = function(req, res) {
  var path = '/api/' + req.params.studentid + '/tests/' + req.params.testid;
  var requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderEditTestPage(req, res, body);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/* PUT test update */
module.exports.updateTest = function(req, res) {
  var path = "/api/" + req.params.studentid + "/tests/" + req.params.testid;
  var postdata = {
    gradeLevel: req.body.gradeLevel
  };
  var requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: postdata
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      res.redirect('/students/' + req.params.studentid);
    }
    else {
      _showError(req, res, response.statusCode);
    }
  });
};

/* DELETE test */
module.exports.deleteTest = function(req, res) {
  var path = '/api/' + req.params.studentid + '/tests/' + req.params.testid;
  var requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    if (response.statusCode !== 204) {
      _showError(req, res, response.statusCode);
    }
    else {
      res.status(200).json({studentid: req.params.studentid});
    }
  });
};

/* GET about page */
module.exports.about = function(req, res) {
  res.render('generic-text', {
    title: 'About',
    content: "IEP Turbo was created by me, Matthew Ehrlich. I am a former special education teacher who spent hours upon hours painstakingly administer tests and write IEPs. Hours that I could've spent teaching, planning lessons, or sitting by the pool.",
    content2: "IEP Turbo was designed to take some of the pain and time out of writing IEPs."
  });
};
