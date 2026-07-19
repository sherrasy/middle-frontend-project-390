import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { TEST_IDS } from '@/shared/constants/testids';

export const Header = () => (
  <header className='bg-white shadow-sm border-b border-gray-200'>
    <div className='max-w-6xl mx-auto px-4 py-4 flex flex-col  '>
      <h1
        className='text-2xl font-bold text-gray-900'
        data-testid={TEST_IDS.smoke}
      >
        Бронирование авиабилетов
      </h1>
      <nav className='flex items-center gap-6'>
        <Link
          to={ROUTES.MAIN}
          className='text-base font-medium underline text-blue-600 hover:text-blue-800 transition-colors'
        >
          Поиск билетов
        </Link>
        <Link
          to={ROUTES.MY}
          className='text-base font-medium underline text-blue-600 hover:text-blue-800 transition-colors'
          data-testid={TEST_IDS.nav.lookup}
        >
          Мои брони
        </Link>
      </nav>
    </div>
  </header>
);
