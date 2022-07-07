import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { getNavigationRoutesByPermissions } from '../../routes/getRoutesByPermissions';
import { useStore } from '../../hooks/useStore';
import { LinkItem } from '../LinkItem/LinkItem';

import styles from './Sidebar.module.scss';

export const Sidebar = observer(({ expanded = true, todayCallsCount }) => {
  const { authStore } = useStore();

  const getRoutesByPermissions = useCallback(
    () => getNavigationRoutesByPermissions(authStore.permissions),
    [authStore.permissions],
  );

  return (
    <div className={styles.Sidebar} style={{ '--sidebar-size': expanded ? '230px' : '50px' }}>
      <div className={styles.SidebarInner}>
        <div className={styles.SidebarHeader}>
          <Link to="/" className={styles.SidebarHeaderLogoLink}>
            <b>CRM</b>
            {expanded && 'SYSTEM'}
          </Link>
        </div>
        <div>
          {getRoutesByPermissions().map((item) => (
            <LinkItem
              key={item.pathName}
              path={item.pathName}
              title={item.title}
              iconName={item.iconName}
              todayCallsCount={
                item.name === 'Calls' && todayCallsCount !== 0 ? todayCallsCount : ''
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
});
