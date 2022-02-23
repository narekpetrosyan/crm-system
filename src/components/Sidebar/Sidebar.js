import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { LinkItem } from '../LinkItem/LinkItem';

import styles from './Sidebar.module.scss';

export const Sidebar = ({ expanded = true, todayCallsCount }) => {
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
          {routes.map((item) => (
            <LinkItem
              key={item.path}
              path={item.path}
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
};
