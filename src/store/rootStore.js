import React from 'react';
import { configure } from 'mobx';
import AuthStore from './auth/authStore';
import UiStore from './ui/uiStore';
import UsersStore from './users/usersStore';
import CitiesStore from './cities/citiesStore';
import ContrAgentsStore from './contr-agents/contrAgentsStore';
import CallsStore from './calls/callsStore';
import WorkersStore from './workers/workersStore';
import OrdersStore from './orders/ordersStore';
import AnalyticsStore from './analytics/analyticsStore';

configure({
  enforceActions: 'never',
});

export class RootStore {
  authStore;

  uiStore;

  usersStore;

  citiesStore;

  contrAgentsStore;

  callsStore;

  workersStore;

  ordersStore;

  analyticsStore;

  constructor() {
    this.authStore = new AuthStore();
    this.uiStore = new UiStore();
    this.usersStore = new UsersStore();
    this.citiesStore = new CitiesStore();
    this.contrAgentsStore = new ContrAgentsStore();
    this.callsStore = new CallsStore();
    this.workersStore = new WorkersStore();
    this.ordersStore = new OrdersStore();
    this.analyticsStore = new AnalyticsStore();
  }
}

export const StoresContext = React.createContext(new RootStore());
