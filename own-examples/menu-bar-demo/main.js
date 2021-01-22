// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  // Create Menu
  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        { label: "Does Nothing" },
        {
          label: "Show Directory",
          click() {
            shell.openPath(__dirname);
          },
        },
        {
          label: "Open Google",
          click() {
            shell.openExternal("https://google.com/");
          },
        },
        { type: "separator" }, // Add seperator
        {
          label: "Exit",
          click() {
            app.quit();
          },
          accelerator: "CmdOrCtrl+Shift+X",
        },
      ],
    },
    {
      label: "Color",
      submenu: [
        {
          label: "Red",
          click() {
            setColor("red");
          },
          accelerator: "R",
        },
        {
          label: "Green",
          click() {
            setColor("green");
          },
          accelerator: "G",
        },
        {
          label: "Blue",
          click() {
            setColor("blue");
          },
          accelerator: "B",
        },
        {
          label: "Yellow",
          click() {
            setColor("yellow");
          },
          accelerator: "Y",
        },
        { type: "separator" }, // Add seperator
        {
          label: "Reset",
          click() {
            setColor("");
          },
          accelerator: "CmdOrCtrl+Shift+R",
        },
      ],
    },
  ]);

  // Set menu as application menu
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

function setColor(color) {
  mainWindow.webContents.send("setBackgroundColor", color);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
