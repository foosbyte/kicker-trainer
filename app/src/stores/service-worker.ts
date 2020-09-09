import { bind } from 'decko';
import installServiceWorker from 'hops-pwa';
import { observable, action } from 'mobx';

export class ServiceWorker {
  @observable
  public updateAvailable = false;

  constructor() {
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

  @bind
  @action
  private handleUpdate(): void {
    this.updateAvailable = true;
  }

  @action
  public async install(): Promise<void> {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration && registration.waiting) {
      registration.waiting.postMessage('skipWaiting');
    }
  }
}
