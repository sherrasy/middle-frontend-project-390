import { UI_MESSAGES } from '@/shared/constants/messages';
import { Loader } from '@/shared/ui/loader';
import { useState } from 'react';
import { LookupFormValues } from '../model/schems';
import { useCancelBooking } from '../model/useCancelBooking';
import { useGetBooking } from '../model/useGetBooking';
import { BookingDetails } from './common/details';
import { LookupForm } from './common/form';

import { TEST_IDS } from '@/shared/constants/testids';
import { EmptyState } from '@/shared/ui/emptyState';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import {
  BookingLookupViewState,
  getBookingLookupViewState,
} from '../lib/getViewState';

export const BookingLookupPage = () => {
  const { booking, isLoading, error, search, setBooking } = useGetBooking();
  const { mutate: cancel, isLoading: isCancelling } = useCancelBooking();
  const [cancelError, setCancelError] = useState<string | null>(null);

  const handleSearch = async (values: LookupFormValues) => {
    setCancelError(null);
    await search(values.code, values.lastName);
  };

  const handleCancel = async () => {
    if (!booking) return;
    setCancelError(null);
    try {
      const updated = await cancel(
        booking.code,
        booking.passengers[0].lastName,
      );
      setBooking(updated);
    } catch {
      setCancelError(UI_MESSAGES.bookingLookup.error.description);
    }
  };

  const state = getBookingLookupViewState(isLoading, error, booking);

  const resultContent = (() => {
    switch (state) {
      case BookingLookupViewState.Loading:
        return <Loader />;
      case BookingLookupViewState.NotFound:
        return (
          <EmptyState
            testId={TEST_IDS.bookingLookup.notFound}
            title={UI_MESSAGES.bookingLookup.notFound.title}
            description={UI_MESSAGES.bookingLookup.notFound.description}
          />
        );
      case BookingLookupViewState.Error:
        return (
          <ErrorMessage
            title={UI_MESSAGES.error.title}
            description={UI_MESSAGES.bookingLookup.error.description}
            apiMessage={error}
          />
        );
      case BookingLookupViewState.Details:
        return (
          <BookingDetails
            booking={booking!}
            onCancel={handleCancel}
            isCancelling={isCancelling}
          />
        );
      case BookingLookupViewState.Form:
      default:
        return null;
    }
  })();

  return (
    <div className='max-w-6xl w-full py-8 space-y-6 '>
      <h2 className='text-2xl font-bold'>Моя бронь</h2>
      <LookupForm onSubmit={handleSearch} />
      {cancelError && (
        <ErrorMessage
          title={UI_MESSAGES.error.title}
          description={UI_MESSAGES.bookingLookup.error.description}
          apiMessage={cancelError}
        />
      )}
      {resultContent}
    </div>
  );
};
