'use strict';

var exports = module.exports = {};

const path = require('path');

exports.initialize = (protocol) => {
  protocol.registerFileProtocol('css', (request, callback) => {
    const url = request.url.substr(6);
    callback({path: path.join(__dirname, '/views/css/' + url)});
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  });

  protocol.registerFileProtocol('js', (request, callback) => {
    const url = request.url.substr(5);
    callback({path: path.join(__dirname, '/views/js/' + url)});
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  });
};
