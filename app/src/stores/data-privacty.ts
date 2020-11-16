import { action, computed, makeObservable, observable } from 'mobx';

const hasStorage = () => typeof window !== 'undefined' && window.localStorage;

export class DataPrivacy {
  private saved: null | boolean = null;

  constructor() {
    makeObservable<DataPrivacy, 'saved'>(this, {
      saved: observable,
      accepted: computed,
      accept: action,
    });

    const read = (): string =>
      hasStorage()
        ? window.localStorage.getItem('data-privacy') || 'false'
        : 'null';
    this.saved = JSON.parse(read());
  }

  public get accepted(): boolean {
    return this.saved !== false;
  }

  public accept(): void {
    this.saved = true;
    if (hasStorage()) {
      window.localStorage.setItem('data-privacy', 'true');
    }
  }
}
