var mongoose = require('mongoose');
var Item = mongoose.model('Item');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.allItems = function(req, res) {
  Item
    .find()
    .exec(function(err, items) {
      if (!items) {
        sendJsonResponse(res, 404, {
          "message": "No items found"
        });
        return;
      }
      sendJsonResponse(res, 200, items);
    });
};

module.exports.itemReadOne = function(req, res) {
  if (req.params && req.params.itemid) {
    Item
      .findById(req.params.itemid)
      .exec(function(err, item) {
        if (!item) {
          sendJsonResponse(res, 404, {
            "message": "itemid not found"
          });
          return;
        }
        sendJsonResponse(res, 200, item);
      });
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "No itemid in request"
    });
  }
};

module.exports.itemCreate = function(req, res) {};

module.exports.itemUpdate = function(req, res) {};

module.exports.itemDelete = function(req, res) {};
