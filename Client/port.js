'use strict';

var exports = module.exports = {};

var open_port;

const serial = require('serialport-js');
serial.find((ports) => {
  console.log(ports);
  if(ports.length != 0) {
    serial.open(ports[0].port, (port) => {
      open_port = port;
    },'\n');
  }
});

exports.send = (data) => {
  open_port.send(data);
}

/*const SerialPort = require('serialport');
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
*/
