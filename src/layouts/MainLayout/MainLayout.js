import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Switch } from 'react-router-dom';
import { useStore } from '@hooks/useStore';
import { Header } from '@components/Header/Header';
import { Sidebar } from '@components/Sidebar/Sidebar';
import { AuthRoute } from '@components/AuthRoute/AuthRoute';
import Loader from '@components/Loader/Loader';

import styles from './MainLayout.module.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getRoutesByPermissions } from '../../routes/getRoutesByPermissions';

const MainLayout = observer(() => {
  const { authStore, uiStore, callsStore, contrAgentsStore, citiesStore } = useStore();

  useEffect(() => {
    callsStore.fetchCalls();
    contrAgentsStore.fetchContrAgents();
    citiesStore.fetchCities();
  }, []);

  return (
    <div className={styles.MainLayout}>
      <Sidebar expanded={uiStore.expanded} todayCallsCount={callsStore.todayCallsCount} />

      <Header logoutHandler={authStore.logout} showMenu={uiStore.expandMenu} />

      <div className={styles.Content}>
        <React.Suspense fallback={<Loader />}>
          <Switch>
            {getRoutesByPermissions(authStore.permissions).map((item) => (
              <AuthRoute
                key={item.pathName}
                exact={item.exact}
                type="authorized"
                path={item.pathName}
                component={item.element}
              />
            ))}
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
});

export default MainLayout;
