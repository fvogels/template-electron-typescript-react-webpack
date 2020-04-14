const { app, BrowserWindow } = require('electron');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html');
}

app.on('ready', createWindow);


// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//       app.quit();
//   }
// });

// app.on('activate', () => {
//   if (mainWindow === null) {
//       createWindow();
//   }
// });