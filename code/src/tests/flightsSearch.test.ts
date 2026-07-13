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
import { CITIES_FIXTURE } from './_fixtures/cities';
import { FLIGHTS_FIXTURE } from './_fixtures/flights';

describe('Flight Search - Main Page', () => {
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

  const waitForCitiesLoaded = async () => {
    await page.waitForFunction(
      (selector) => {
        const select = document.querySelector(
          selector,
        ) as HTMLSelectElement | null;
        return select !== null && select.options.length > 1;
      },
      `[data-testid="${TEST_IDS.search.origin}"]`,
      { timeout: 10000 },
    );
  };

  const waitForFlightsLoaded = async () => {
    await page
      .locator(`[data-testid="${TEST_IDS.flights.item}"]`)
      .first()
      .waitFor({ state: 'visible', timeout: 15000 });
  };

  const mockCities = async () => {
    await page.route('*/api/cities', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(CITIES_FIXTURE),
      });
    });
  };

  const mockFlights = async (response: { status: number; body: unknown }) => {
    await page.route(/\/api\/flights(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: response.status,
        contentType: 'application/json',
        body: JSON.stringify(response.body),
      });
    });
  };

  const submitSearch = async () => {
    await page.click(`[data-testid="${TEST_IDS.search.submit}"]`);
  };

  const loadPage = async (options?: {
    flights?: { status: number; body: unknown };
  }) => {
    await mockCities();
    await mockFlights(
      options?.flights ?? { status: 200, body: FLIGHTS_FIXTURE },
    );

    await page.goto(getAppUrl(), { waitUntil: 'domcontentloaded' });
  };

  it('renders search form properly', async () => {
    await loadPage();

    const form = page.locator(`[data-testid="${TEST_IDS.search.form}"]`);
    await form.waitFor({ state: 'visible', timeout: 10000 });
    expect(await form.isVisible()).toBe(true);

    await waitForCitiesLoaded();

    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.search.origin}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.search.destination}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page.locator(`[data-testid="${TEST_IDS.search.date}"]`).isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.search.passengers}"]`)
        .isVisible(),
    ).toBe(true);
    expect(
      await page
        .locator(`[data-testid="${TEST_IDS.search.submit}"]`)
        .isVisible(),
    ).toBe(true);
  });

  it('shows initial flights', async () => {
    await loadPage();

    await waitForFlightsLoaded();

    const items = page.locator(`[data-testid="${TEST_IDS.flights.item}"]`);
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  it('shows flight info in flight card', async () => {
    await loadPage();

    await waitForFlightsLoaded();

    const firstItem = page
      .locator(`[data-testid="${TEST_IDS.flights.item}"]`)
      .first();
    expect(await firstItem.isVisible()).toBe(true);

    const text = await firstItem.innerText();
    expect(text).toContain('₽');
  });

  it('shows empty state', async () => {
    await loadPage({ flights: { status: 200, body: [] } });

    const empty = page.locator(`[data-testid="${TEST_IDS.flights.empty}"]`);
    await empty.waitFor({ state: 'visible', timeout: 10000 });
    expect(await empty.isVisible()).toBe(true);
  });

  it('handles search flights', async () => {
    await loadPage();

    await waitForCitiesLoaded();

    await page.selectOption(`[data-testid="${TEST_IDS.search.origin}"]`, {
      index: 1,
    });
    await page.selectOption(`[data-testid="${TEST_IDS.search.destination}"]`, {
      index: 2,
    });

    await submitSearch();

    await page.waitForLoadState('networkidle', { timeout: 10000 });
    await waitForFlightsLoaded();

    const results = page.locator(`[data-testid="${TEST_IDS.flights.results}"]`);
    expect(await results.isVisible()).toBe(true);
  });

  it('navigates to booking page on button click', async () => {
    await loadPage();

    await waitForFlightsLoaded();

    const bookButton = page
      .locator(`[data-testid="${TEST_IDS.flights.book}"]`)
      .first();
    expect(await bookButton.isVisible()).toBe(true);

    await bookButton.click();

    await page.waitForURL(/\/booking\/.+/, { timeout: 5000 });
    expect(page.url()).toMatch(/\/booking\/.+/);
  });

  it('shows error state on API failure', async () => {
    await loadPage({
      flights: {
        status: 500,
        body: { code: 'INTERNAL_ERROR', message: 'Server error' },
      },
    });

    const error = page.locator(`[data-testid="${TEST_IDS.flights.error}"]`);
    await error.waitFor({ state: 'visible', timeout: 10000 });
    expect(await error.isVisible()).toBe(true);
  });
});
