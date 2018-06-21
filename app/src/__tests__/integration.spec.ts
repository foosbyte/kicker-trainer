import devices from 'puppeteer/DeviceDescriptors';
import { getElementWithText, tapElementWithText } from './helpers';

declare const page: import('puppeteer').Page;

describe('integration smoke tests', () => {
  beforeEach(async () => {
    jest.setTimeout(10000);
    await page.emulate(devices['Pixel 2']);
  });
  it('should visit training page', async () => {
    await page.goto('http://localhost:8080/training/5bar-chip-bottom');
    await tapElementWithText(page, 'Start training');
    await tapElementWithText(page, 'Hit');
    const quota = await page.evaluate(
      element => element.nextElementSibling.innerText,
      await getElementWithText(page, 'Gesamt Quote')
    );
    expect(quota).toEqual('100%');
  });
});
