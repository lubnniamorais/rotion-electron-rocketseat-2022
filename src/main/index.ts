import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { registerRoute } from '../lib/electron-router-dom';

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    icon:
      process.platform === 'win32'
        ? path.join(__dirname, '../../build/icon.ico')
        : path.join(__dirname, '../../build/icon.png'),
    // ...(process.platform === 'linux'
    //   ? { icon: path.join(__dirname, '../../build/icon.png') }
    //   : { icon: path.join(__dirname, '../../build/icon.ico') }),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  // Importante: registrar a rota (a lib gerencia o loadURL/loadFile)
  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html'), // usado em produção
  });

  // console.log(
  //   '[main] registerRoute called, URL =>',
  //   mainWindow.webContents.getURL()
  // );

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Abre as ferramentas de desenvolvedor
  mainWindow.webContents.openDevTools();

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  // } else {
  //   mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  // }
}

if (process.platform === 'darwin') {
  // Esse comando é para mudar o ícone do dock no Mac
  app.dock?.setIcon(path.resolve(__dirname, 'icon.png'));
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  ipcMain.on('window-minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.minimize();
  });

  ipcMain.on('window-maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    if (win.isMaximized()) {
      win.unmaximize();
      win.webContents.send('window-state', false);
    } else {
      win.maximize();
      win.webContents.send('window-state', true);
    }
  });

  ipcMain.on('window-close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
