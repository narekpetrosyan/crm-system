import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useStore } from '../../hooks/useStore';

import styles from './MainLayout.module.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const MainLayout = observer(() => {
  const { authStore, uiStore } = useStore();
  return (
    <div className={styles.MainLayout}>
      <Sidebar expanded={uiStore.expanded} />

      <Header logoutHandler={authStore.logout} showMenu={uiStore.expandMenu} />

      <div className={styles.Content}>
        <Outlet />
      </div>
    </div>
  );
});
