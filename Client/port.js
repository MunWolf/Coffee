'use strict';

var exports = module.exports = {};

const SerialPort = require('serialport');
var port = undefined;

SerialPort.list((err, ports) => {
  port = new SerialPort(ports[0].comName);
});

var ready = false;
var queue = [];
port.open(() => { ready = true; });

exports.isOpen = () => { return ready; };

exports.send = (data) => {
  if (!ready) {
    return false;
  }

  port.write(data);
  return true;
};
