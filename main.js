const { app, BrowserWindow } = require('electron');
const path = require('path');

const { ipcMain } = require('electron');
const runPuppeteerTask = require('./puppeteer-script');

// Listen for IPC calls to run Puppeteer
ipcMain.handle('run-puppeteer', async () => {
    try {
        return await runPuppeteerTask();
    } catch (error) {
        return `Error: ${error.message}`;
    }
});


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: true, // Allow Node.js integration
            contextIsolation: false,
        },
    });

    // Load the Vue app
    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // For live reloading during development
    require('electron-reload')(__dirname);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
