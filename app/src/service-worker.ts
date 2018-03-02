importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js',
);

declare const workbox: any;

export default function(assets: string[]): void {
  workbox.precaching.precacheAndRoute(assets.map(a => '/' + a));

  // (workbox as any).routing.registerRoute();
}
