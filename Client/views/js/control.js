'use strict';

let directory = $('#directory').text();
const port = require(directory + '/port.js');

$(document).ready(() => {
  $('.element-on').click(() => {
    port.send('eo');
  });

  $('.steam-on').click(() => {
    port.send('so');
  });

  $('.pump-on').click(() => {
    port.send('po');
  });

  $('.filter-on').click(() => {
    port.send('fo');
  });

  $('.all-off').click(() => {
    port.send('ii');
  });

  var t = () => {
    $('#coffee').get(0).switch_content('main');
  }
});
