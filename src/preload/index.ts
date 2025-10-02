import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// if (process.contextIsolated) {
// try {
// Expondo APIs do Electron Toolkit
//     contextBridge.exposeInMainWorld('electron', electronAPI);

// Expondo API custom (se quiser usar futuramente)
//     contextBridge.exposeInMainWorld('api', api);

// Expondo API custom para controle da janela
// contextBridge.exposeInMainWorld('electronButton', {
//   minimize: () => ipcRenderer.send('window-minimize'),
//   maximize: () => ipcRenderer.send('window-maximize'),
//   close: () => ipcRenderer.send('window-close'),
// });

contextBridge.exposeInMainWorld('electronButton', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  onWindowState: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on('window-state', (_, isMaximized) => callback(isMaximized));
  },
});

console.log('>> Preload carregado!');

//   } catch (error) {
//     console.error(error);
//   }
// } else {
//   window.electron = electronAPI;
//   window.api = api;
// }
