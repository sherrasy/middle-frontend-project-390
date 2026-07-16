import { Page } from 'playwright';
import { CITIES_FIXTURE } from './cities';
import { FLIGHTS_FIXTURE } from './flights';
import { BOOKING_FIXTURE } from './bookingResponse';

export const mockCities = async (page: Page) => {
  await page.route('**/api/cities', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(CITIES_FIXTURE),
    });
  });
};

export const mockFlights = async (
  page: Page,
  response: { status: number; body: unknown } = {
    status: 200,
    body: FLIGHTS_FIXTURE,
  },
) => {
  await page.route(/\/api\/flights(\?.*)?$/, async (route) => {
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });
};

export const mockFlightById = async (
  page: Page,
  flightId: string,
  response: { status: number; body: unknown } = {
    status: 200,
    body: FLIGHTS_FIXTURE.find((f) => f.id === flightId) ?? {
      message: 'Not found',
    },
  },
) => {
  await page.route(/\/api\/flights\/([^/?]+)$/, async (route, request) => {
    const match = request.url().match(/\/api\/flights\/([^/?]+)$/);
    if (match?.[1] !== flightId) {
      return route.continue();
    }
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });
};

export const mockCreateBooking = async (
  page: Page,
  response: { status: number; body: unknown } = {
    status: 200,
    body: BOOKING_FIXTURE,
  },
) => {
  await page.route('**/api/bookings', async (route) => {
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });
};
