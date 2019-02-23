import { ElementHandle, Page } from 'puppeteer';

export const getElementWithText = async (
  page: Page,
  text: string
): Promise<ElementHandle> => {
  const handle = await page.$x(`//*[contains(text(), '${text}')]`);
  if (handle.length === 0) {
    throw new Error('Unable to find element with text matching: ' + text);
  }
  return handle[0];
};

export const tapElementWithText = async (
  page: Page,
  text: string
): Promise<void> => {
  await (await getElementWithText(page, text)).tap();
};

export const tapElementWithSelector = async (
  page: Page,
  selector: string
): Promise<void> => {
  await (await page.$(selector))!.tap();
};
