import installServiceWorker from 'hops-pwa';
import { action, makeObservable, observable } from 'mobx';

export class ServiceWorker {
  public updateAvailable = false;

  constructor() {
    makeObservable(this, {
      updateAvailable: observable,
      install: action,
      handleUpdate: action,
    });

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing || !hasServiceWorker) {
          return;
        }
        refreshing = true;
        window.location.reload(true);
      });

      // check if a previous service worker is exiting
      const hasServiceWorker = navigator.serviceWorker.controller;

      function installUpdateListener(
        callback: (registration: ServiceWorkerRegistration) => void
      ): (registration: ServiceWorkerRegistration) => void {
        return (registration: ServiceWorkerRegistration) => {
          function listenForWaitingServiceWorker(
            registration: ServiceWorkerRegistration
          ): void {
            const awaitStateChange = () => {
              if (registration.installing) {
                registration.installing.addEventListener(
                  'statechange',
                  function (): void {
                    if (this.state === 'installed') {
                      callback(registration);
                    }
                  }
                );
              }
            };
            if (hasServiceWorker) {
              if (registration.waiting) {
                return callback(registration);
              }
              if (registration.installing) {
                awaitStateChange();
              }
            }
            registration.addEventListener('updatefound', () => {
              if (hasServiceWorker) {
                awaitStateChange();
              }
            });
          }

          listenForWaitingServiceWorker(registration);
        };
      }

      installServiceWorker().then(installUpdateListener(this.handleUpdate));
    }
  }

  handleUpdate = () => {
    this.updateAvailable = true;
  };

  public async install(): Promise<void> {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration && registration.waiting) {
      registration.waiting.postMessage('skipWaiting');
    }
  }
}
