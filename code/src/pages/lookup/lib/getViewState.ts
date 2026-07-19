export const BookingLookupViewState = {
  Loading: 'loading',
  NotFound: 'not-found',
  Error: 'error',
  Form: 'form',
  Details: 'details',
} as const;

type BookingLookupViewState =
  (typeof BookingLookupViewState)[keyof typeof BookingLookupViewState];

export const getBookingLookupViewState = (
  loading: boolean,
  error: string | null,
  booking: unknown,
): BookingLookupViewState => {
  if (loading) return BookingLookupViewState.Loading;
  if (error) {
    const isNotFound = error.includes('404');
    if (isNotFound) return BookingLookupViewState.NotFound;
    return BookingLookupViewState.Error;
  }
  if (booking) return BookingLookupViewState.Details;
  return BookingLookupViewState.Form;
};
