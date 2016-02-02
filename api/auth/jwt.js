'use strict';
/* jshint node: true */
/* jshint esversion: 6 */
var models = require('../../models');


module.exports = function(decoded, request, callback) {
  models.User.findOne({
    attributes: [
      'email', 'id', 'createdAt', 'updatedAt'
    ],
    where: {
      email: decoded.email
    }
  }).then(function(result) {
    if (result) {
      return callback(null, true, result);
    }
    else {
      return callback(null, false);
    }
  });
};
