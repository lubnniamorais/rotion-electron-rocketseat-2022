import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Code,
  CaretDoubleRight,
  TrashSimple,
  Minus,
  Square,
  X,
} from 'phosphor-react';
import * as Breadcrumbs from './Breadcrumbs';

export function Header() {
  const isMacOS = process.platform === 'darwin';
  const isSidebarOpen = true;
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    window.electronButton.onWindowState((maximized) => {
      setIsMaximized(maximized);
    });
  }, []);

  return (
    <div
      id='header'
      className={clsx(
        'border-b border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        }
      )}
    >
      <button
        className={clsx('h-5 w-5 text-rotion-200 hover:text-rotion-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className='h-4 w-4' />
      </button>

      <Breadcrumbs.Root>
        <Breadcrumbs.Item>
          <Code weight='bold' className='h-4 w-4 text-pink-500' />
          Estrutura técnica
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.HiddenItems />
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
      </Breadcrumbs.Root>

      <div className='inline-flex region-no-drag'>
        <button className='inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50'>
          <TrashSimple className='h-4 w-4' />
          Apagar
        </button>
      </div>

      {/* Botões estilo Windows */}
      <div className='inline-flex region-no-drag ml-auto window-controls'>
        {/* Minimizar */}
        <button
          className='w-10 h-8 flex items-center justify-center hover:bg-gray-700 text-gray-300 hover:text-white'
          onClick={() => window.electronButton.minimize()}
        >
          <Minus weight='bold' className='h-4 w-4' />
        </button>

        {/* Maximizar / Restaurar */}
        <button
          className='w-10 h-8 flex items-center justify-center hover:bg-gray-700 text-gray-300 hover:text-white'
          onClick={() => window.electronButton.maximize()}
        >
          {isMaximized ? (
            <Square weight='bold' className='h-3.5 w-3.5' /> // Restaurar
          ) : (
            <Square weight='bold' className='h-4 w-4' /> // Maximizar
          )}
        </button>

        {/* Fechar */}
        <button
          className='w-10 h-8 flex items-center justify-center hover:bg-red-600 text-gray-300 hover:text-white'
          onClick={() => window.electronButton.close()}
        >
          <X weight='bold' className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
}
