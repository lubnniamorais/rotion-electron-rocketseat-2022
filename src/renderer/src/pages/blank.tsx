import { Link } from 'react-router-dom';

export function Blank() {
  return (
    <main className='flex flex-1 items-center justify-center text-rotion-400'>
      Selecione ou crie um documento
      <Link to='/document'>Acessar documento</Link>
    </main>
  );
}
