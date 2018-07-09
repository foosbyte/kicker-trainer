import { action, computed, observable, reaction, runInAction } from 'mobx';

const GA_ID = 'UA-121233177-1';
const GA_CONFIG = {
  anonymize_ip: true,
};
const hasDocument = () => typeof document !== 'undefined';
const hasStorage = () => typeof window !== 'undefined' && window.localStorage;

declare const dataLayer: any[];

export class DataPrivacy {
  @observable private saved!: boolean | null;
  @observable private currentLocation!: string;

  constructor() {
    const read = (): string =>
      hasStorage()
        ? window.localStorage.getItem('data-privacy') || 'false'
        : 'null';
    runInAction(() => {
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = [];
      }
      this.currentLocation = '/';
      this.saved = JSON.parse(read());
      if (this.accepted && hasDocument()) {
        this.loadGA();
      }
    });

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

  @computed
  public get accepted(): boolean {
    return this.saved !== false;
  }

  @action
  public setLocation(location: string): void {
    this.currentLocation = location;
  }

  @action
  public accept(): void {
    this.saved = true;
    if (hasStorage()) {
      window.localStorage.setItem('data-privacy', 'true');
    }
    this.loadGA();
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
