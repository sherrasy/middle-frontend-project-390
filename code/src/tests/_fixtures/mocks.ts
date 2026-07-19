import { Page } from 'playwright';
import { CITIES_FIXTURE } from './cities';
import { FLIGHTS_FIXTURE } from './flights';
import { BOOKING_FIXTURE } from './bookingResponse';
export interface MockResponse<T = unknown> {
  status: number;
  body: T;
}

export type MockHandler = (page: Page, response: MockResponse) => Promise<void>;

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
  response: MockResponse = {
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
  response: MockResponse = {
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
  response: MockResponse = {
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

export const mockBookingApi = async (
  page: Page,
  options: {
    get?: MockResponse;
    delete?: MockResponse;
  } = {},
) => {
  await page.route(/\/api\/bookings\/[^/]+/, async (route, request) => {
    if (request.method() === 'GET' && options.get) {
      await route.fulfill({
        status: options.get.status,
        contentType: 'application/json',
        body: JSON.stringify(options.get.body),
      });
      return;
    }

    if (request.method() === 'DELETE' && options.delete) {
      await route.fulfill({
        status: options.delete.status,
        contentType: 'application/json',
        body: JSON.stringify(options.delete.body),
      });
      return;
    }

    await route.continue();
  });
};
