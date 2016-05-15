/*GET student home page */
module.exports.index = function(req, res) {
  res.render('index', {title: 'Tests'});
};

/*GET test page */
module.exports.test = function(req, res) {
  res.render('index', {title: 'Test'});
};
