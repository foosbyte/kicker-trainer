import { Page, Request } from 'puppeteer';
import * as devices from 'puppeteer/DeviceDescriptors';
import {
  getElementWithText,
  tapElementWithSelector,
  tapElementWithText,
} from './helpers';

function assertClientSideNavigation(page: Page): () => void {
  function handler(request: Request): void {
    if (request.isNavigationRequest()) {
      throw new Error('Expected client-side navigation only');
    }
  }

  page.addListener('request', handler);
  return () => page.removeListener('request', handler);
}

describe('integration smoke tests', () => {
  beforeAll(() => {
    jest.setTimeout(90000);

    page.on('console', (message) => {
      if (message.type() === 'error') {
        throw new Error(message.text());
      }
    });
  });

  beforeEach(async () => {
    await page.emulate(devices['Pixel 2']);
  });

  describe('GDPR notice', () => {
    it('should show GDPR message', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const notice = await getElementWithText(page, 'Cookies');
      expect(await notice.isIntersectingViewport()).toBe(true);
    });

    it('should hide GDPR message after accepting it', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithText(page, 'Cookies');
      await tapElementWithText(page, 'Akzeptieren');
      await expect(page).not.toMatch('Cookies');
      deregisterEventHandlers();
    });
  });

  describe('categories page', () => {
    it('should be available from tab bar', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithText(page, 'Categories');
      await expect(page).toMatch('3 Bar Exercises');
      deregisterEventHandlers();
    });

    it('should render server side', async () => {
      await page.goto('http://localhost:8080/categories', {
        waitUntil: 'networkidle2',
      });
      await expect(page).toMatch('3 Bar Exercises');
    });
  });

  describe('exercises page', () => {
    it('should be available through categories page', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithText(page, 'Categories');
      await tapElementWithText(page, '3 Bar Exercises');
      await expect(page).toMatch('Pin Mitte: Links Lang');
      deregisterEventHandlers();
    });

    it('should render server side', async () => {
      await page.goto('http://localhost:8080/exercises/3bar', {
        waitUntil: 'networkidle2',
      });
      await expect(page).toMatch('Pin Mitte: Links Lang');
    });

    it('should allow scrolling if there are too many exercises', async () => {
      await page.goto('http://localhost:8080/exercises/3bar', {
        waitUntil: 'networkidle2',
      });

      const scrollView = await page.$('[data-role="scrollview"]');
      expect(scrollView).toBeDefined();

      const scrollTop = await page.evaluate((el) => {
        el.scrollTop = 100;
        return el.scrollTop;
      }, scrollView);

      await expect(scrollTop).toBe(100);
    });

    it('should have the navigation bar in viewport, even with many exercises', async () => {
      await page.goto('http://localhost:8080/exercises/3bar', {
        waitUntil: 'networkidle2',
      });

      const profileButton = await getElementWithText(page, 'Profile');
      expect(await profileButton.isIntersectingViewport()).toBe(true);
    });
  });

  describe('training page', () => {
    it('should be available through exercises page', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithText(page, 'Categories');
      await tapElementWithText(page, '3 Bar Exercises');
      await tapElementWithText(page, 'Pin Mitte: Links Lang');
      await expect(page).toMatch('Start training');
      deregisterEventHandlers();
    });

    it('should allow to record hit/miss', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithText(page, 'Categories');
      await tapElementWithText(page, '3 Bar Exercises');
      await tapElementWithText(page, 'Pin Mitte: Links Lang');
      await tapElementWithText(page, 'Start training');
      await tapElementWithText(page, 'Hit');
      await tapElementWithText(page, 'Miss');
      await tapElementWithText(page, 'End training');
      const quota = await page.evaluate(
        (element) => element.innerText,
        await page.$('[data-role="quota"]')
      );
      expect(quota).toEqual('50');
      deregisterEventHandlers();
    });

    it('should render server side', async () => {
      await page.goto(
        'http://localhost:8080/training/3bar-pin-center-left-long',
        {
          waitUntil: 'networkidle2',
        }
      );
      await expect(page).toMatch('Start training');
    });
  });

  describe('stats page', () => {
    it('should be available through tab bar', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithText(page, 'Stats');
      await expect(page).toMatch('You are doing fabulous');
      await expect(page).toMatch('Pin Mitte: Links Lang');
      deregisterEventHandlers();
    });

    it('should render server side', async () => {
      await page.goto('http://localhost:8080/stats', {
        waitUntil: 'networkidle2',
      });
      await expect(page).toMatch('Pin Mitte: Links Lang');
    });
  });

  describe('profile page', () => {
    it('should show last training', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await expect(page).toMatch('Pin Mitte: Links Lang');
      deregisterEventHandlers();
    });

    it('should render server side', async () => {
      await page.goto('http://localhost:8080/', {
        waitUntil: 'networkidle2',
      });
      await expect(page).toMatch('Pin Mitte: Links Lang');
    });
  });

  describe('settings page', () => {
    it('should be available through profile page', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      const deregisterEventHandlers = assertClientSideNavigation(page);
      await tapElementWithSelector(page, 'a[href="/settings"]');
      await expect(page).toMatch('Clear storage');
      deregisterEventHandlers();
    });

    it('should allow to force hard reload', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      await tapElementWithSelector(page, 'a[href="/settings"]');

      const requests = new Map();
      page.on('request', (req) => {
        requests.set(req.url(), req);
      });

      await tapElementWithText(page, 'Reload without cache');
      await page.waitForNavigation({ waitUntil: 'networkidle2' });

      expect(requests.has('http://localhost:8080/settings')).toBeTruthy();
    });

    it('should allow to clear all local storage', async () => {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      await tapElementWithSelector(page, 'a[href="/settings"]');
      await tapElementWithText(page, 'Clear storage');
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      await expect(page).toMatch('Cookies');
    });
  });
});
