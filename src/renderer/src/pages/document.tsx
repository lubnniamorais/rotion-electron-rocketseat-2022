import { Link } from 'react-router-dom';

export function Document() {
  return (
    <main className='flex flex-1 items-center justify-center text-rotion-400'>
      Document
      <Link to='/document'>Acessar blank</Link>
    </main>
  );
}
