// main.js

// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage,
  NativeImage,
} = require("electron");

const path = require("path");
const { lstatSync } = require("fs");

const patchMiz = require("./patchMiz");

ipcMain.on("patch", (path) => {
  console.log("dans main.on", path);
  patchMiz(path);
});

ipcMain.handle("patchMiz", async (event, path) => {
  const result = patchMiz(path);
  return result;
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // et charger l'index.html de l'application.
  mainWindow.loadFile("index.html");
  //mainWindow.webContents.openDevTools();

  // Ouvrir les outils de développement.
  // mainWindow.webContents.openDevTools()

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });
};

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle("is-file", async (_, path) => {
  return lstatSync(path).isFile();
});

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
