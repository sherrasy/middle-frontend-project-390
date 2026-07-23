import { TEST_IDS } from '@/shared/constants/testids';
import { chromium, type Browser, type Page } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Smoke test - Main Header', () => {
  let browser: Browser | undefined;
  let page: Page | undefined;
  let context: Awaited<ReturnType<Browser['newContext']>> | undefined;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async () => {
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
  });

  it('should render main and have non-empty h1', async () => {
    const appUrl = process.env.APP_URL;
    if (!appUrl) {
      throw new Error('APP_URL is not defined');
    }

    if (!page) {
      throw new Error('Page is not initialized');
    }

    await page.goto(appUrl);

    const heading = page.locator(`[data-testid="${TEST_IDS.smoke}"]`);

    const isVisible = await heading.isVisible();
    expect(isVisible).toBe(true);

    const text = await heading.innerText();
    expect(text.trim().length).toBeGreaterThan(0);
  });
});
