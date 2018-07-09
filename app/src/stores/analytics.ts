import { action, observable, reaction, runInAction } from 'mobx';
import { DataPrivacy } from './data-privacty';

const GA_ID = 'UA-121233177-1';
const GA_CONFIG = {
  anonymize_ip: true,
};
const hasDocument = () => typeof document !== 'undefined';

declare const dataLayer: any[];

export class Analytics {
  @observable private currentLocation!: string;

  constructor(dataPrivacy: DataPrivacy) {
    runInAction(() => {
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = [];
      }
      this.currentLocation = '/';
    });

    reaction(
      () => dataPrivacy.accepted,
      accepted => {
        if (accepted && hasDocument()) {
          this.loadGA();
        }
      },
      { fireImmediately: true }
    );
    reaction(
      () => this.currentLocation,
      location => {
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
    };
    document.body.appendChild(script);
  }

  @action
  public setLocation(location: string): void {
    this.currentLocation = location;
  }

  public track(): void {
    this.gtag('event', 'bla');
  }

  public trackPageView(page: string): void {
    this.gtag('config', GA_ID, { ...GA_CONFIG, page_path: page });
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
    name: string,
    params?: { [key: string]: string }
  ): void;
  private gtag(): void {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push(arguments);
    }
  }
}
