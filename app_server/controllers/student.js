var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://boiling-fortress-24821.herokuapp.com/";
}

/*GET student home page */
module.exports.index = function(req, res) {
  res.render('index', {title: 'Tests'});
};

/*GET test page */
module.exports.test = function(req, res) {
  res.render('index', {title: 'Test'});
};
