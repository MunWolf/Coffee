'use strict';

let directory = $('#directory').text();
const port = require(directory + '/port.js');

var CallManager = {
  current: undefined,
  set: (callback, time) => {
    if (CallManager.current !== undefined) {
      CallManager.kill();
    }

    CallManager.current = setTimeout(callback, time);
  },
  kill: () => {
    if (CallManager.current !== undefined) {
      clearTimeout(CallManager.current);
      CallManager.current = undefined;
    }
  }
};

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
    CallManager.kill();
  });

  var stop = () => {
    port.send('ii');
    CallManager.current = undefined;
    $('#stop').get(0).switch_content('main');
  };

  $('.create-espresso').click(() => { CallManager.set(stop, 10000); });
  $('.create-tea').click(() => { CallManager.set(stop, 8000); });
  $('.create-brew').click(() => { CallManager.set(stop, 60000); });
});
