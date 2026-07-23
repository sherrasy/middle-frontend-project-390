export const FLIGHTS_FIXTURE = [
  {
    id: 'fl_1',
    flightNumber: 'SU1234',
    airline: {
      code: 'SU',
      name: 'Аэрофлот',
    },
    origin: {
      code: 'MOW',
      name: 'Москва',
      country: 'Россия',
    },
    destination: {
      code: 'LED',
      name: 'Санкт-Петербург',
      country: 'Россия',
    },
    departureAt: '2026-07-01T08:00:00Z',
    arrivalAt: '2026-07-01T09:25:00Z',
    durationMinutes: 85,
    price: {
      amount: 5400,
      currency: 'RUB',
    },
    seatsAvailable: 42,
  },
  {
    id: 'fl_2',
    flightNumber: 'DP202',
    airline: {
      code: 'DP',
      name: 'Победа',
    },
    origin: {
      code: 'MOW',
      name: 'Москва',
      country: 'Россия',
    },
    destination: {
      code: 'LED',
      name: 'Санкт-Петербург',
      country: 'Россия',
    },
    departureAt: '2026-07-01T13:30:00Z',
    arrivalAt: '2026-07-01T15:00:00Z',
    durationMinutes: 90,
    price: {
      amount: 3200,
      currency: 'RUB',
    },
    seatsAvailable: 18,
  },
];
