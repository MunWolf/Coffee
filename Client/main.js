'use strict';

const file = require('./file_handler.js');
const { BrowserWindow, app, protocol } = require('electron');
const pages = require('./template_loader.js');
const path = require('path')

app.commandLine.appendSwitch('touch-events', 'enabled');

let win
function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, frame: false, fullscreen: true});
  //win.webContents.openDevTools();
  win.loadURL('data: text/html, ' + encodeURIComponent(pages.render('home', {
    AppName: 'Remote Coffee',
    Directory: __dirname,
    Page: 'Home'
  })));

  win.on('closed', () => {
    win = null;
  });

  // We can probably just use 'emulated' mouse events.
  /*win.on('touchstart', () => {

  };

  win.on('touchmove', () => {

  };

  win.on('touchcancel', () => {

  };

  win.on('touchend', () => {

  };*/
}

app.on('ready', function() {
  file.initialize(protocol);
  pages.onReady(createWindow);
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/*app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})*/
