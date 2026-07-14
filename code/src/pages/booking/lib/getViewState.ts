export const BookingViewState = {
  Loading: 'loading',
  FlightNotFound: 'flight-not-found',
  FlightError: 'flight-error',
  Form: 'form',
  Success: 'success',
} as const;

type BookingViewState =
  (typeof BookingViewState)[keyof typeof BookingViewState];

export const getBookingViewState = (
  flightLoading: boolean,
  flightError: string | null,
  flight: unknown,
  booking: unknown,
): BookingViewState => {
  if (flightLoading) return BookingViewState.Loading;
  if (flightError) {
    const isNotFound = flightError.includes('404');
    if (isNotFound) return BookingViewState.FlightNotFound;
    return BookingViewState.FlightError;
  }
  if (!flight) return BookingViewState.FlightNotFound;
  if (booking) return BookingViewState.Success;
  return BookingViewState.Form;
};
