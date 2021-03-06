var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://boiling-fortress-24821.herokuapp.com/";
}

/*GET writer home page */
module.exports.index = function(req, res) {
  res.render('index', {title: 'Home'});
};

/*GET item page */
module.exports.item = function(req, res) {
  res.render('index', {title: 'Item'});
};

/*GET add item page */
module.exports.addItem = function(req, res) {
  res.render('index', {title: 'add a new Item'});
};

/*GET edit item page */
module.exports.editItem = function(req, res) {
  res.render('index', {title: 'Edit an item'});
};
