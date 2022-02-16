import { makeAutoObservable } from 'mobx';

export default class AnalyticsStore {
  analytics = [];

  amount = 0;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
}
