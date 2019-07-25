declare module 'nosleep.js' {
  class NoSleep {
    constructor();

    enable(): void;
    disable(): void;
    _addSourceToVideo(
      element: HTMLElement,
      type: string,
      dataURI: string
    ): void;
  }

  export default NoSleep;
}
