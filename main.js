const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');

let win;

function createWindow () {
  // Create the browser window
  win = new BrowserWindow({
    width: 2600,
    height:2600,
    backgroundColor: '#ffffff',
    icon:  path.join(__dirname, `/dist/youth-centre-festival/favicon.ico`)
  })

  win.loadURL(`file://${__dirname}/dist/youth-centre-festival/index.html`);

  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
