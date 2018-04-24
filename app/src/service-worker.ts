import hopsConfig from 'hops-config';

declare var self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'hops-pwa-cache';

export default function(assets: string[]): void {
  const assetsToCache = assets.map(asset => '/' + asset);

  self.addEventListener('install', event =>
    event.waitUntil(
      precacheIfNotExists(assetsToCache).then(() => self.skipWaiting())
    )
  );

  self.addEventListener('activate', event =>
    event.waitUntil(
      removeOldCacheEntries(assetsToCache.concat(hopsConfig.locations))
        .then(() => precache(hopsConfig.locations))
        .then(() => notifyAllClients())
        .then(() => self.clients.claim())
    )
  );

  self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET' || process.env.NODE_ENV !== 'production') {
      return;
    }

    if (new URL(request.url).origin !== location.origin) {
      event.respondWith(
        fromNetwork(request, 5000).then(
          response => {
            event.waitUntil(addToCache(request, response.clone()));
            return response;
          },
          () => fromCache(request)
        )
      );
    } else {
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
    }
  });
}

function fromNetwork(request: Request, timeout: number): Promise<Response> {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject('timed-out'), timeout)
    ) as any,
  ]);
}

function fromCache(request: Request): Promise<Response> {
  return caches
    .open(CACHE_NAME)
    .then(cache => cache.match(request))
    .then(matching => matching || Promise.reject('no-match'));
}

function updateCache(request: Request): Promise<void> {
  return Promise.all([caches.open(CACHE_NAME), fetch(request)]).then(
    ([cache, response]) => cache.put(request, response)
  );
}

function addToCache(request: Request, response: Response): Promise<void> {
  return caches.open(CACHE_NAME).then(cache => cache.put(request, response));
}

function removeOldCacheEntries(assets: string[]): Promise<void> {
  return caches.open(CACHE_NAME).then(cache =>
    cache.keys().then(requests =>
      requests.forEach(request => {
        if (!assets.find(asset => request.url === location.origin + asset)) {
          cache.delete(request);
        }
      })
    )
  );
}

function precache(assets: string[]): Promise<void> {
  return caches.open(CACHE_NAME).then(cache => cache.addAll(assets));
}

function precacheIfNotExists(assets: string[]): Promise<void> {
  return caches.open(CACHE_NAME).then(cache =>
    cache.keys().then(requests => {
      assets.forEach(asset => {
        if (
          !requests.find(request => request.url === location.origin + asset)
        ) {
          cache.add(asset);
        }
      });
    })
  );
}

function notifyAllClients(): Promise<void> {
  return self.clients.matchAll({ includeUncontrolled: true }).then(clients =>
    clients.forEach(client =>
      client.postMessage(
        JSON.stringify({
          type: 'serviceworker-updated',
        })
      )
    )
  );
}
