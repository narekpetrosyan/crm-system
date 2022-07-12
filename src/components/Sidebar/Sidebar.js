import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { getNavigationRoutesByPermissions } from '../../routes/getRoutesByPermissions';
import { useStore } from '../../hooks/useStore';
import { LinkItem } from '../LinkItem/LinkItem';

import styles from './Sidebar.module.scss';
import Heading from '../Heading/Heading';

export const Sidebar = observer(({ expanded = true, todayCallsCount }) => {
  const { authStore, callsStore } = useStore();

  useEffect(() => {
    callsStore.fetchIncomingCalls(authStore.user.id);
    const interval = setInterval(() => {
      callsStore.fetchIncomingCalls(authStore.user.id);
    }, 60000);

    return () => clearInterval(interval);
  }, [callsStore, authStore]);

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

          {callsStore.incomingCallsCount > 0 && (
            <div className={styles.incomingCalls}>
              <Heading variant="h4">Звонки в течении 5 минут</Heading>
              <span>{callsStore.incomingCallsCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
