import hopsConfig from 'hops-config';

declare var self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'hops-pwa-cache';

export default function(assets: string[]): void {
  const assetsToCache = assets.map(asset => '/' + asset);

  self.addEventListener('message', messageEvent => {
    if (messageEvent.data === 'skipWaiting') {
      self.skipWaiting();
    }
  });

  self.addEventListener('install', event => {
    return event.waitUntil(precacheIfNotExists(assetsToCache));
  });

  self.addEventListener('activate', event => {
    return event.waitUntil(
      removeOldCacheEntries(assetsToCache.concat(hopsConfig.locations)).then(
        () => precache(hopsConfig.locations)
      )
    );
  });

  self.addEventListener('fetch', event => {
    const { request } = event;

    if (
      request.method !== 'GET' ||
      new URL(request.url).origin !== location.origin ||
      /__webpack_hmr/.test(request.url)
    ) {
      return;
    }

    event.respondWith(
      fromCache(request).then(
        response => {
          event.waitUntil(updateCache(request));
          return response;
        },
        () => {
          return fromNetwork(request, 60000).then(response => {
            event.waitUntil(addToCache(request, response.clone()));
            return response;
          });
        }
      )
    );
  });
}

function fromNetwork(request: Request, timeout: number): Promise<Response> {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject('timed-out'), timeout)
    ) as Promise<never>,
  ]);
}

async function fromCache(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE_NAME);
  const match = await cache.match(request);
  if (match) {
    return match;
  }
  throw new Error('no-match');
}

async function updateCache(request: Request): Promise<void> {
  const [cache, response] = await Promise.all([
    caches.open(CACHE_NAME),
    fetch(request),
  ]);
  return cache.put(request, response);
}

async function addToCache(request: Request, response: Response): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  return cache.put(request, response);
}

async function removeOldCacheEntries(assets: string[]): Promise<boolean[]> {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();

  return Promise.all(
    requests
      .filter(
        request =>
          !assets.some(asset => request.url === location.origin + asset)
      )
      .map(request => cache.delete(request))
  );
}

async function precache(assets: string[]): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(assets);
}

async function precacheIfNotExists(assets: string[]): Promise<void[]> {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();

  return Promise.all(
    assets
      .filter(
        asset =>
          !requests.some(request => request.url === location.origin + asset)
      )
      .map(asset => cache.add(asset))
  );
}
