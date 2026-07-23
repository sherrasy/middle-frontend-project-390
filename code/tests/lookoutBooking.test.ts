import { ROUTES } from '@/shared/constants/routes';
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
import { PASSENGER_FIXTURE } from './_fixtures/bookingFormData';
import {
  BOOKING_FIXTURE,
  CANCELLED_BOOKING_FIXTURE,
} from './_fixtures/bookingResponse';
import { mockBookingApi } from './_fixtures/mocks';

describe('Booking Actions - Lookup Page', () => {
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

  const loadPage = async (options?: {
    booking?: { status: number; body: unknown };
    cancel?: { status: number; body: unknown };
  }) => {
    if (options?.booking || options?.cancel) {
      await mockBookingApi(page, {
        get: options?.booking,
        delete: options?.cancel,
      });
    }

    await page.goto(`${getAppUrl()}/${ROUTES.MY}`, {
      waitUntil: 'domcontentloaded',
    });
    await page
      .waitForLoadState('networkidle', { timeout: 15000 })
      .catch(() => {});
  };

  const searchBooking = async () => {
    await page
      .locator(`[data-testid="${TEST_IDS.bookingLookup.mainCode}"]`)
      .fill(BOOKING_FIXTURE.code);
    await page
      .locator(`[data-testid="${TEST_IDS.bookingLookup.lastName}"]`)
      .fill(PASSENGER_FIXTURE.lastName);
    await page
      .locator(`[data-testid="${TEST_IDS.bookingLookup.submit}"]`)
      .click();
  };

  it('renders lookup form properly', async () => {
    await loadPage();

    const form = page.locator(`[data-testid="${TEST_IDS.bookingLookup.form}"]`);
    await form.waitFor({ state: 'visible', timeout: 10000 });
    expect(await form.isVisible()).toBe(true);

    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.bookingLookup.mainCode}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.bookingLookup.lastName}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.bookingLookup.submit}"]`)
        .isVisible(),
    ).toBe(true);
  });

  it('displays booking details', async () => {
    await loadPage({
      booking: { status: 200, body: BOOKING_FIXTURE },
    });

    await searchBooking();

    const details = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.details}"]`,
    );
    await details.waitFor({ state: 'visible', timeout: 10000 });
    expect(await details.isVisible()).toBe(true);

    const code = page.locator(`[data-testid="${TEST_IDS.bookingLookup.code}"]`);
    expect(await code.innerText()).toBe(BOOKING_FIXTURE.code);

    const status = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.status}"]`,
    );
    expect(await status.getAttribute('data-status')).toBe('confirmed');

    const text = await details.innerText();
    expect(text).toContain(BOOKING_FIXTURE.code);
    expect(text).toContain(PASSENGER_FIXTURE.lastName);
  });

  it('shows not found for invalid code', async () => {
    await loadPage({
      booking: {
        status: 404,
        body: { code: 'not_found', message: 'Бронь не найдена' },
      },
    });

    await searchBooking();

    const notFound = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.notFound}"]`,
    );
    await notFound.waitFor({ state: 'visible', timeout: 10000 });
    expect(await notFound.isVisible()).toBe(true);

    const form = page.locator(`[data-testid="${TEST_IDS.bookingLookup.form}"]`);
    expect(await form.isVisible()).toBe(true);
  });

  it('validates empty form', async () => {
    await loadPage();

    let requestMade = false;
    await page.route('**/api/bookings/**', async (route) => {
      requestMade = true;
      await route.continue();
    });

    await page
      .locator(`[data-testid="${TEST_IDS.bookingLookup.submit}"]`)
      .click();

    const codeInput = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.mainCode}"]`,
    );
    await expect
      .poll(
        async () => {
          const ariaInvalid = await codeInput.getAttribute('aria-invalid');
          return ariaInvalid === 'true';
        },
        { timeout: 3000 },
      )
      .toBe(true);

    expect(requestMade).toBe(false);
  });

  it('hides cancel button for cancelled', async () => {
    await loadPage({
      booking: { status: 200, body: CANCELLED_BOOKING_FIXTURE },
    });

    await searchBooking();

    const statusBadge = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.status}"]`,
    );
    expect(await statusBadge.getAttribute('data-status')).toBe('cancelled');

    const cancelButton = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.cancel}"]`,
    );
    expect(await cancelButton.isVisible()).toBe(false);
  });

  it('cancels booking and updates status', async () => {
    await loadPage({
      booking: { status: 200, body: BOOKING_FIXTURE },
      cancel: { status: 200, body: CANCELLED_BOOKING_FIXTURE },
    });

    await searchBooking();

    await page
      .locator(`[data-testid="${TEST_IDS.bookingLookup.details}"]`)
      .waitFor({ state: 'visible', timeout: 10000 });

    const cancelButton = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.cancel}"]`,
    );
    await expect
      .poll(() => cancelButton.isVisible(), { timeout: 5000 })
      .toBe(true);

    await cancelButton.click();

    const statusBadge = page.locator(
      `[data-testid="${TEST_IDS.bookingLookup.status}"]`,
    );
    await expect
      .poll(async () => statusBadge.getAttribute('data-status'), {
        timeout: 10000,
      })
      .toBe('cancelled');

    await expect
      .poll(() => cancelButton.isVisible().catch(() => false), {
        timeout: 5000,
      })
      .toBe(false);
  });
});
