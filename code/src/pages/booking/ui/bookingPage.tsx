import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { UI_MESSAGES } from '@/shared/constants/messages';
import { TEST_IDS } from '@/shared/constants/testids';
import { EmptyState } from '@/shared/ui/emptyState';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import { Loader } from '@/shared/ui/loader';

import { BookingForm } from './common/bookingForm';
import { BookingSuccess } from './common/bookingSuccess';
import { FlightInfo } from './common/flightInfo';
import { useGetFlight } from '../model/useGetFlight';
import { useCreateBooking } from '../model/useCreateBooking';
import { BookingFormValues } from '../model/schems';
import { BookingViewState, getBookingViewState } from '../lib/getViewState';

export const BookingPage = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const {
    flight,
    isLoading: flightLoading,
    error: flightError,
  } = useGetFlight(flightId || '');
  const { booking, error: bookingError, mutate } = useCreateBooking();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: BookingFormValues) => {
    setServerError(null);
    try {
      await mutate({
        flightId: flightId!,
        contact: values.contact,
        passengers: values.passengers,
      });
    } catch (err: any) {
      setServerError(err.message || UI_MESSAGES.booking.error.description);
    }
  };

  const state = getBookingViewState(
    flightLoading,
    flightError,
    flight,
    booking,
  );

  const content = (() => {
    switch (state) {
      case BookingViewState.Loading:
        return <Loader />;

      case BookingViewState.FlightNotFound:
        return (
          <EmptyState
            testId={TEST_IDS.booking.flightNotFound}
            icon={UI_MESSAGES.booking.flightNotFound.icon}
            title={UI_MESSAGES.booking.flightNotFound.title}
            description={UI_MESSAGES.booking.flightNotFound.description}
          />
        );

      case BookingViewState.FlightError:
        return (
          <ErrorMessage
            testId={TEST_IDS.booking.error}
            title={UI_MESSAGES.booking.error.title}
            description={UI_MESSAGES.booking.error.description}
            apiMessage={flightError}
          />
        );

      case BookingViewState.Success:
        return (
          <BookingSuccess
            code={booking!.code}
            origin={booking!.flight.origin.name}
            destination={booking!.flight.destination.name}
            flightNumber={booking!.flight.flightNumber}
            passengersCount={booking!.passengers.length}
            totalPrice={booking!.totalPrice.amount}
          />
        );

      case BookingViewState.Form:
        return (
          <>
            <h2 className='text-2xl font-bold text-gray-900'>
              Оформление бронирования
            </h2>
            <FlightInfo flight={flight} />
            {/* <BookingForm
              onSubmit={handleSubmit}
              serverError={serverError || bookingError}
            /> */}
          </>
        );
    }
  })();

  return <div className='max-w-6xl py-8 space-y-6'>{content}</div>;
};
