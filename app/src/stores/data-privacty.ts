import { action, computed, observable, runInAction } from 'mobx';

const hasStorage = () => typeof window !== 'undefined' && window.localStorage;

export class DataPrivacy {
  @observable
  private saved!: boolean | null;

  constructor() {
    const read = (): string =>
      hasStorage()
        ? window.localStorage.getItem('data-privacy') || 'false'
        : 'null';
    runInAction(() => {
      this.saved = JSON.parse(read());
    });
  }

  @computed
  public get accepted(): boolean {
    return this.saved !== false;
  }

  @action
  public accept(): void {
    this.saved = true;
    if (hasStorage()) {
      window.localStorage.setItem('data-privacy', 'true');
    }
  }
}
