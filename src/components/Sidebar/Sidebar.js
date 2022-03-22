import React from 'react';
import { Link } from 'react-router-dom';
import { LinkItem } from '../LinkItem/LinkItem';

import styles from './Sidebar.module.scss';
import { getNavigationRoutesByPermissions } from '../../routes/getRoutesByPermissions';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';

export const Sidebar = observer(({ expanded = true, todayCallsCount }) => {
  const { authStore } = useStore();

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
          {getNavigationRoutesByPermissions(authStore.permissions).map((item) => (
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
