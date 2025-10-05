import { ElectronAPI } from '@electron-toolkit/preload';
import { api } from '@/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
    electronButton: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      onWindowState: (callback: (isMaximized: boolean) => void) => void;
    };
  }
}

export {};
