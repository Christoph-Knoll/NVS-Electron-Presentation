// Import electron library
const { BrowserView } = require('electron');
const electron = require('electron');

// Create electron app
// const app = electron.app

// ES6 Destructuring syntax
const { app, BrowserWindow } = electron

// Call arrow function when app is ready
app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    // Load index.html with ES6 template string
    //mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Load website
    mainWindow.loadURL('https://electronjs.org')

})