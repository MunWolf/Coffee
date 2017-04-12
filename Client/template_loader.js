'use strict';

const mustache = require('mustache');
const fs = require('fs');
const as = require('async');
const path = require('path');

var templates = {};
var callbacks = [];
var ready = false;

exports.onReady = function(callback) {
  if (ready)
    callback();
  else
    callbacks.push(callback);
};

exports.template = function(name) {
  return templates[name];
};

exports.render = function(name, params) {
  return mustache.render(templates[name], params, templates);
};

var files = [
  { path: path.join(__dirname, '/views/header.mustache'), name: 'header' },
  { path: path.join(__dirname, '/views/index.mustache'), name: 'home' }
];

as.each(files, function(data, done) {
  fs.readFile(data.path, 'utf8', function(err, content) {
    templates[data.name] = content;
    done();
  });
}, function (err) {
  ready = true;
  for (var i = 0; i < callbacks.length; i++)
    callbacks[i]();
});
