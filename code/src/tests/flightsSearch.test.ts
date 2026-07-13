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

  const gotoAndWait = async () => {
    await page.goto(getAppUrl());
    await page.waitForLoadState('networkidle');
  };

  const submitSearch = async () => {
    await page.click(`[data-testid="${TEST_IDS.search.submit}"]`);
  };

  it('renders search form properly', async () => {
    await gotoAndWait();

    const form = page.locator(`[data-testid="${TEST_IDS.search.form}"]`);
    await form.waitFor({ state: 'visible', timeout: 5000 });
    expect(await form.isVisible()).toBe(true);

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
    await gotoAndWait();

    const items = page.locator(`[data-testid="${TEST_IDS.flights.item}"]`);
    await items.first().waitFor({ state: 'visible', timeout: 10000 });

    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  it('shows flight info in flight card', async () => {
    await gotoAndWait();

    const firstItem = page
      .locator(`[data-testid="${TEST_IDS.flights.item}"]`)
      .first();
    await firstItem.waitFor({ state: 'visible', timeout: 10000 });
    expect(await firstItem.isVisible()).toBe(true);

    const text = await firstItem.innerText();
    expect(text).toContain('₽');
  });

  it('handles search flights', async () => {
    await gotoAndWait();

    await page
      .locator(`[data-testid="${TEST_IDS.search.origin}"]`)
      .waitFor({ state: 'visible' });

    await page.selectOption(`[data-testid="${TEST_IDS.search.origin}"]`, {
      index: 1,
    });
    await page.selectOption(`[data-testid="${TEST_IDS.search.destination}"]`, {
      index: 2,
    });

    await submitSearch();

    const results = page.locator(`[data-testid="${TEST_IDS.flights.results}"]`);
    await results.waitFor({ state: 'visible', timeout: 10000 });
    expect(await results.isVisible()).toBe(true);
  });

  it('navigates to booking page on button click', async () => {
    await gotoAndWait();

    const bookButton = page
      .locator(`[data-testid="${TEST_IDS.flights.book}"]`)
      .first();
    await bookButton.waitFor({ state: 'visible', timeout: 10000 });
    expect(await bookButton.isVisible()).toBe(true);

    await bookButton.click();

    await page.waitForURL(/\/booking\/.+/, { timeout: 5000 });
    expect(page.url()).toMatch(/\/booking\/.+/);
  });

  it('shows empty state', async () => {
    await gotoAndWait();

    await page.route('**/api/flights**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      }),
    );

    await submitSearch();

    const empty = page.locator(`[data-testid="${TEST_IDS.flights.empty}"]`);
    await empty.waitFor({ state: 'visible', timeout: 10000 });
    expect(await empty.isVisible()).toBe(true);
  });

  it('shows error state on API failure', async () => {
    await gotoAndWait();

    await page.route('**/api/flights**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          code: 'INTERNAL_ERROR',
          message: 'Server error',
        }),
      }),
    );

    await submitSearch();

    const error = page.locator(`[data-testid="${TEST_IDS.flights.error}"]`);
    await error.waitFor({ state: 'visible', timeout: 10000 });
    expect(await error.isVisible()).toBe(true);
  });
});
