// preload.js

const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld("electron", {
  startDrag: (fileName) => {
    ipcRenderer.send("ondragstart", path.join(process.cwd(), fileName));
  },
});

const api = {
  isFile: (path) => ipcRenderer.invoke("is-file", path),
  patchMiz: (path) => ipcRenderer.invoke("patchMiz", path),
};

contextBridge.exposeInMainWorld("api", api);
