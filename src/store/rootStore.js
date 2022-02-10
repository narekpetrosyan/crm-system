import React from 'react';
import { configure } from 'mobx';
import AuthStore from './auth/authStore';
import UiStore from './ui/uiStore';
import UsersStore from './users/usersStore';

configure({
  enforceActions: 'never',
});

export class RootStore {
  authStore;

  uiStore;

  usersStore;

  constructor() {
    this.authStore = new AuthStore();
    this.uiStore = new UiStore();
    this.usersStore = new UsersStore();
  }
}

export const StoresContext = React.createContext(new RootStore());
