import { ipcMain } from 'electron';

// Através do ipcMain conseguimos ouvir eventos, é como se fossem as rotas
// O ipc é uma comunicação entre os processos, ou seja, o main process e o renderer process
// Cada evento precisa ter um título, uma string que identifica o evento

// O event recebe dados específicos do evento fetch-documents, por exemplo
ipcMain.handle('fetch-documents', async (_, params) => {
  console.log(params);

  return 'Hello World';
});
