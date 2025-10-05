import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

/**
 * O prelod têm o papel de expôr para o processo renderer as APIs,as possíveis
 * comunicações que teremos entre renderer e main. Ou seja, as "rotas" que tivermos
 * no ipc, precisam estar declaradas no preload para dizer que elas existem e
 * podem ser usadas pelo renderer.
 */

// Custom APIs for renderer
export const api = {
  fetchDocuments: (params: any) => {
    // Passamos o nome do evento que demos no ipcMain, e no segundo argumento
    // passamos os params

    // Quando é um evento que busca informações e retorna temos que usar o método invoke
    // pois o método send apenas envia
    return ipcRenderer.invoke('fetch-documents', params);
  },
};

if (process.contextIsolated) {
  try {
    // Expondo APIs do Electron Toolkit
    contextBridge.exposeInMainWorld('electron', electronAPI);

    // Expondo API custom (se quiser usar futuramente)
    contextBridge.exposeInMainWorld('api', api);

    // Expondo API custom para controle da janela
    contextBridge.exposeInMainWorld('electronButton', {
      minimize: () => ipcRenderer.send('window-minimize'),
      maximize: () => ipcRenderer.send('window-maximize'),
      close: () => ipcRenderer.send('window-close'),
      onWindowState: (callback: (isMaximized: boolean) => void) => {
        ipcRenderer.on('window-state', (_, isMaximized) =>
          callback(isMaximized)
        );
      },
    });

    // console.log('>> Preload carregado!');
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
