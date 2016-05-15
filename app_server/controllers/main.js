/*GET home page */
module.exports.index = function(req, res) {
  res.render('student-list', {
    title: 'IEP-Turbo - IEPs made easy',
    pageHeader: {
      title: 'IEP Turbo',
      strapline: 'IEP goals made fast and easy!'
    },
    students: [
      {
        lastName: "Ehrlich",
        firstName: "Matthew",
        grade: 8
      },
      {
        lastName: "Washington",
        firstName: "George",
        grade: 5
      }
    ]
  });
};

/*GET student page */
module.exports.student = function(req, res) {
  res.render('student-info', {title: 'Student'});
};

/*GET add student page */
module.exports.addStudent = function(req, res) {
  res.render('add-student', {title: 'Add a new student'});
};

/*GET edit student page */
module.exports.editStudent = function(req, res) {
  res.render('index', {title: 'Edit a student'});
};

/*GET test page */
module.exports.test = function(req, res) {
  res.render('index', {title: 'Test'});
};

/*GET add test page */
module.exports.addTest = function(req, res) {
  res.render('index', {title: 'Add a new test'});
};

/*GET edit a test page */
module.exports.editTest = function(req, res) {
  res.render('index', {title: 'Edit a test'});
};

/* GET about page */
module.exports.about = function(req, res) {
  res.render('generic-text', {title: 'About'});
}
