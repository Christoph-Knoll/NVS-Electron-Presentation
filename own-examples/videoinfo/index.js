// Import electron library
const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')

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
            // Bad! Enables cross site scripting
            nodeIntegration: true
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