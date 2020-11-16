import { action, makeObservable, observable, reaction } from 'mobx';
import { DataPrivacy } from './data-privacty';

const GA_ID = 'UA-121233177-1';
const GA_CONFIG = {
  anonymize_ip: true,
};
const hasDocument = () => typeof document !== 'undefined';

declare const dataLayer: any[];

export interface EventTrackingParameters {
  event_category?: string;
  event_label?: string;
  value?: number;
  non_interaction?: boolean;
  [name: string]: any;
}

export class Analytics {
  private currentLocation = '/';

  constructor(dataPrivacy: DataPrivacy) {
    makeObservable<Analytics, 'currentLocation'>(this, {
      currentLocation: observable,
      setLocation: action,
    });

    if (typeof window !== 'undefined') {
      (window as any).dataLayer = [];
      this.currentLocation = window.location.pathname;
    }

    reaction(
      () => dataPrivacy.accepted,
      (accepted) => {
        if (accepted && hasDocument()) {
          this.loadGA();
        }
      },
      { fireImmediately: true }
    );
    reaction(
      () => this.currentLocation,
      (location) => {
        this.trackPageView(location);
      }
    );
  }

  private loadGA(): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.onload = () => {
      this.gtag('js', new Date());
      this.gtag('config', GA_ID, GA_CONFIG);
      this.trackUserTimings();
    };
    document.body.appendChild(script);
  }

  public setLocation(location: string): void {
    this.currentLocation = location;
  }

  public track(action: string, params?: EventTrackingParameters): void {
    this.gtag('event', action, params);
  }

  public trackPageView(page: string): void {
    this.gtag('config', GA_ID, { ...GA_CONFIG, page_path: page });
  }

  public trackException(exception: Error): void {
    this.gtag('event', 'exception', {
      description: exception.stack || exception.toString(),
    });
  }

  public trackUserTimings(): void {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      this.gtag('event', 'timing_complete', {
        name: 'dns',
        value: timing.domainLookupEnd - timing.domainLookupStart,
      });
      this.gtag('event', 'timing_complete', {
        name: 'connect',
        value: timing.connectEnd - timing.connectStart,
      });
      this.gtag('event', 'timing_complete', {
        name: 'ttfb',
        value: timing.responseStart - timing.connectEnd,
      });
      this.gtag('event', 'timing_complete', {
        name: 'response',
        value: timing.responseEnd - timing.responseStart,
      });
      this.gtag('event', 'timing_complete', {
        name: 'load',
        value: timing.loadEventStart - timing.responseEnd,
      });
    }
  }

  private gtag(
    command: 'config',
    id: string,
    opts?: {
      anonymize_ip?: boolean;
      send_page_view?: boolean;
      page_path?: string;
    }
  ): void;
  private gtag(command: 'js', date: Date): void;
  private gtag(command: 'set', data: { [key: string]: string }): void;
  private gtag(
    command: 'event',
    action: string,
    params?: EventTrackingParameters
  ): void;
  private gtag(): void {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push(arguments);
    }
  }
}
