declare module 'puppeteer/DeviceDescriptors' {
  import { EmulateOptions } from 'puppeteer';
  const devices: { [name: string]: Partial<EmulateOptions> };
  export = devices;
}
