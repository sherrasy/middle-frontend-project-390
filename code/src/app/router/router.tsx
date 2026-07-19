import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layout/layout';
import { HomePage } from '@/pages/home/ui/homePage';
import { BookingPage } from '@/pages/booking/ui/bookingPage';
import { ROUTES } from '@/shared/constants/routes';
import { NotFoundPage } from '@/pages/not-found/ui/notFoundPage';
import { BookingLookupPage } from '@/pages/lookup/ui/lookupPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: `${ROUTES.BOOKING}/:flightId`, element: <BookingPage /> },
      { path: `${ROUTES.MY}`, element: <BookingLookupPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
