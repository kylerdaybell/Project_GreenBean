const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
if(isDev === false){
  electron.Menu.setApplicationMenu(null);
}
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: {
    nodeIntegration: true,
    webSecurity: !isDev,
    preload: __dirname + '/preload.js'
  }, frame: isDev
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}
console.log(__dirname)
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
