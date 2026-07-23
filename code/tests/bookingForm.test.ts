import { TEST_IDS } from '@/shared/constants/testids';
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from 'playwright';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import {
  CONTACT_FIXTURE,
  PASSENGER_FIXTURE,
} from './_fixtures/bookingFormData';
import { BOOKING_FIXTURE } from './_fixtures/bookingResponse';
import { mockCreateBooking, mockFlightById } from './_fixtures/mocks';
import { ROUTES } from '@/shared/constants/routes';

describe('Booking Page', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterEach(async () => {
    await context.close();
  });

  const getAppUrl = () => {
    const url = process.env.APP_URL;
    if (!url) throw new Error('APP_URL is not defined');
    return url;
  };

  const loadBookingPage = async (
    flightId: string,
    options?: {
      flight?: { status: number; body: unknown };
      booking?: { status: number; body: unknown };
    },
  ) => {
    await mockFlightById(page, flightId, options?.flight);
    if (options?.booking) {
      await mockCreateBooking(page, options.booking);
    }

    await page.goto(`${getAppUrl()}/${ROUTES.BOOKING}/${flightId}`, {
      waitUntil: 'domcontentloaded',
    });
    await page
      .waitForLoadState('networkidle', { timeout: 15000 })
      .catch(() => {});
  };

  const fillContact = async () => {
    await page
      .locator(`[data-testid="${TEST_IDS.booking.contactEmail}"]`)
      .fill(CONTACT_FIXTURE.email);
    await page
      .locator(`[data-testid="${TEST_IDS.booking.contactPhone}"]`)
      .fill(CONTACT_FIXTURE.phone);
  };

  const fillPassenger = async (index: number) => {
    const passengerIds = TEST_IDS.booking.passenger(index);
    await page
      .locator(`[data-testid="${passengerIds.firstName}"]`)
      .fill(PASSENGER_FIXTURE.firstName);
    await page
      .locator(`[data-testid="${passengerIds.lastName}"]`)
      .fill(PASSENGER_FIXTURE.lastName);
    await page
      .locator(`[data-testid="${passengerIds.dob}"]`)
      .fill(PASSENGER_FIXTURE.dateOfBirth);
    await page
      .locator(`[data-testid="${passengerIds.document}"]`)
      .fill(PASSENGER_FIXTURE.documentNumber);
  };

  it('renders booking page properly', async () => {
    await loadBookingPage('fl_1');

    const flightInfo = page.locator(
      `[data-testid="${TEST_IDS.booking.flight}"]`,
    );
    await flightInfo.waitFor({ state: 'visible', timeout: 10000 });
    expect(await flightInfo.isVisible()).toBe(true);

    const text = await flightInfo.innerText();
    expect(text).toContain('SU1234');

    const form = page.locator(`[data-testid="${TEST_IDS.booking.form}"]`);
    expect(await form.isVisible()).toBe(true);

    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.booking.contactEmail}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.booking.passenger(0).firstName}"]`)
        .isVisible(),
    ).toBe(true);
  });

  it('adds passenger form', async () => {
    await loadBookingPage('fl_1');
    const passengerIdx = 1;
    const passengerIds = TEST_IDS.booking.passenger(passengerIdx);

    await page
      .locator(`[data-testid="${TEST_IDS.booking.addPassenger}"]`)
      .click();

    expect(
      await page
        .locator(`[data-testid="${passengerIds.firstName}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${passengerIds.lastName}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page.locator(`[data-testid="${passengerIds.dob}"]`).isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${passengerIds.document}"]`)
        .isVisible(),
    ).toBe(true);
  });

  it('validates empty form', async () => {
    await loadBookingPage('fl_1');

    let requestMade = false;
    await page.route('**/api/bookings', async (route) => {
      requestMade = true;
      await route.continue();
    });

    await page.locator(`[data-testid="${TEST_IDS.booking.submit}"]`).click();

    await page.waitForTimeout(500);

    expect(requestMade).toBe(false);

    const form = page.locator(`[data-testid="${TEST_IDS.booking.form}"]`);
    const html = await form.innerHTML();
    expect(html).toContain('border-red-300');
  });

  it('shows booking success with code', async () => {
    await loadBookingPage('fl_1', {
      booking: { status: 200, body: BOOKING_FIXTURE },
    });

    await fillContact();
    await fillPassenger(0);

    await page.locator(`[data-testid="${TEST_IDS.booking.submit}"]`).click();

    const success = page.locator(`[data-testid="${TEST_IDS.booking.success}"]`);
    await success.waitFor({ state: 'visible', timeout: 10000 });
    expect(await success.isVisible()).toBe(true);

    const code = page.locator(`[data-testid="${TEST_IDS.booking.code}"]`);
    const codeText = await code.innerText();
    expect(codeText).toHaveLength(6);
    expect(codeText).toMatch(/^[A-Z0-9]+$/);

    const text = await success.innerText();
    expect(text).toContain('SU1234');
  });

  it('shows not found for unknown flightId', async () => {
    await loadBookingPage('unknown-id', {
      flight: {
        status: 404,
        body: { code: '404', message: 'Flight not found' },
      },
    });

    const notFound = page.locator(
      `[data-testid="${TEST_IDS.booking.flightNotFound}"]`,
    );
    await notFound.waitFor({ state: 'visible', timeout: 10000 });
    expect(await notFound.isVisible()).toBe(true);

    const form = page.locator(`[data-testid="${TEST_IDS.booking.form}"]`);
    expect(await form.isVisible()).toBe(false);
  });

  it('shows error state on API failure', async () => {
    await loadBookingPage('fl_1', {
      booking: {
        status: 500,
        body: { code: 'INTERNAL_ERROR', message: 'Server error' },
      },
    });

    await fillContact();
    await fillPassenger(0);

    await page.locator(`[data-testid="${TEST_IDS.booking.submit}"]`).click();

    const error = page.locator(`[data-testid="${TEST_IDS.booking.error}"]`);
    await error.waitFor({ state: 'visible', timeout: 10000 });
    expect(await error.isVisible()).toBe(true);

    const form = page.locator(`[data-testid="${TEST_IDS.booking.form}"]`);
    expect(await form.isVisible()).toBe(true);
  });
});
