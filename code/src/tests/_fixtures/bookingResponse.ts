import { CONTACT_FIXTURE, PASSENGER_FIXTURE } from './bookingFormData';
import { FLIGHTS_FIXTURE } from './flights';

export const BOOKING_FIXTURE = {
  code: 'AB1234',
  status: 'confirmed',
  flight: FLIGHTS_FIXTURE[0],
  passengers: [PASSENGER_FIXTURE],
  contact: CONTACT_FIXTURE,
  totalPrice: {
    amount: 5400,
    currency: 'RUB',
  },
  createdAt: '2026-06-25T12:00:00Z',
};
