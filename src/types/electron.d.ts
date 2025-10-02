import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    electronButton: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      onWindowState: (callback: (isMaximized: boolean) => void) => void;
    };
  }
}

export {};
