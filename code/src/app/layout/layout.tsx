import { Outlet } from 'react-router-dom';
import { Header } from './header';

export const MainLayout = () => (
  <div className='min-h-screen bg-gray-50 text-gray-900'>
    <Header />
    <main
      className={`max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-6`}
    >
      <Outlet />
    </main>
  </div>
);
