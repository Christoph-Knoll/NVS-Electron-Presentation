// Import electron library
const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

// Create electron app
// const app = electron.app
// ES6 Destructuring syntax
const { app, BrowserWindow, ipcMain} = electron

let mainWindow

// Call arrow function when app is ready
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // Needed to use node in a BrowserWindow
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script
        }
    });

    // Load index.html with ES6 template string
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})

// Recieve event form event emmiter
// Event object contains where the event came from
ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('The video duration is: ' + metadata.format.duration)

        mainWindow.webContents.send('video:metadata', metadata.format.duration)
    })
})