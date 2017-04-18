'use strict';

let directory = $('#directory').text();
const port = require(directory + '/port.js');

$(document).ready(() => {
  $('.element-on').click(() => {
    port.send('eo');
  });

  $('.element-off').click(() => {
    port.send('en');
  });

  $('.steam-on').click(() => {
    port.send('so');
  });

  $('.steam-off').click(() => {
    port.send('sn');
  });

  $('.pump-on').click(() => {
    port.send('so');
  });

  $('.pump-off').click(() => {
    port.send('sn');
  });

  $('.filter-on').click(() => {
    port.send('so');
  });

  $('.filter-off').click(() => {
    port.send('sn');
  });

  $('.all-off').click(() => {
    port.send('ii');
  });

  var t = () => {
    $('#coffee').get(0).switch_content('main');
  }
});
