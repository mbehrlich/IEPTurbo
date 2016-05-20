var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://boiling-fortress-24821.herokuapp.com/";
}

/*GET users list */
module.exports.index = function(req, res) {
  res.render('index', {title: 'Users'});
};

/*GET user page */
module.exports.user = function(req, res) {
  res.render('index', {title: 'User'});
};

/*GET add user page */
module.exports.addUser = function(req, res) {
  res.render('index', {title: 'Add a new User'});
};

/*GET edit user page */
module.exports.editUser = function(req, res) {
  res.render('index', {title: 'Edit a user'});
};
