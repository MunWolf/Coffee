'use strict';

const file = require('./file_handler.js');
const { BrowserWindow, app, protocol, powerSaveBlocker } = require('electron');
const pages = require('./template_loader.js');
const path = require('path')

powerSaveBlocker.start('prevent-app-suspension');

app.commandLine.appendSwitch('touch-events', 'enabled');

let win
function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, frame: false, fullscreen: true});
  //win.webContents.openDevTools();
  var language;
  if (true) {
    language = {
      tea: 'Tea',
      espresso: 'Espresso',
      steam: 'Steam',
      brew: 'Brew: 4 Cups',
      back: 'Back',
      stop: 'Stop',
      info: {
        teaStart: 'Open the valve once the light is green and push Tea,',
        teaEnd: 'or push Back if you want to stop.',
        espressoStart: 'Push espresso once the light is green,',
        espressoEnd: 'or Back if you want to stop.',
        milkStart: 'Open the valve once the light is green',
        milkEnd: 'and push Back once you are done.',
        brew: 'Don\'t hesitate to get yourself some chocolate with this wonderful coffee, enjoy!',
        brewTimer: 'Time until done:',
        stop: 'Wait for the machine to stop or hit the stop button once you are done, remember to close the valve.'
      }
    };
  } else {
    language = {
      tea: 'Te',
      espresso: 'Espresso',
      steam: 'Gufa',
      brew: 'Uppáhelling: 4 Bollar',
      back: 'Til baka',
      stop: 'Stöðva',
      info: {
        teaStart: 'Skrúfaðu frá lokanum þegar ljósið er grænt og ýttu á Te,',
        teaEnd: 'eða ýttu á Til baka ef þú vilt hætta við.',
        espressoStart: 'Ýttu á Espresso þegar ljósið er grænt,',
        espressoEnd: 'eða Til baka ef þú vilt hætta við.',
        milkStart: 'Skrúfaðu frá lokanum þegar ljósið er grænt',
        milkEnd: 'og ýttu á Til baka þegar þú ert búinn.',
        brew: 'Ekki hika við að fá þér smá súkkulaði með þessu frábæra kaffi, verði þér að góðu!',
        brewTimer: 'Tími til loka:',
        stop: 'Bíddu eftir að vélin hættir eða ýttu á stöðva þegar þú ert búinn, mundu að loka lokanum.'
      }
    };
  }

  win.loadURL('data: text/html, ' + encodeURIComponent(pages.render('home', {
    AppName: 'Remote Coffee',
    Directory: __dirname,
    Page: 'Home',
    Language: language
  })));

  win.on('closed', () => {
    win = null;
  });
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
