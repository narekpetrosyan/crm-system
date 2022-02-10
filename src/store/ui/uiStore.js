import { makeAutoObservable } from 'mobx';

export default class UiStore {
  expanded = true;

  constructor() {
    makeAutoObservable(this);
    this.expandMenu = this.expandMenu.bind(this);
  }

  expandMenu = () => {
    this.expanded = !this.expanded;
  };
}
