import { observable } from 'mobx';

export class Store {
  @observable public text = 'hello world';
  constructor() {
    setTimeout(() => {
      this.text = 'hallo welt';
    }, 3000);
  }
}
