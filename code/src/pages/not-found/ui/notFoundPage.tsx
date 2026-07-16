import { UI_MESSAGES } from '@/shared/constants/messages';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <h1 className='text-6xl font-bold text-gray-900 mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-2'>{UI_MESSAGES.notFound.title}</p>
      <p className='text-gray-500 mb-8'>{UI_MESSAGES.notFound.description}</p>
      <button
        onClick={() => navigate(ROUTES.MAIN)}
        className='px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors'
      >
        На главную
      </button>
    </div>
  );
};
