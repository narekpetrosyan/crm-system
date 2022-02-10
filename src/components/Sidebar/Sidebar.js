import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { LinkItem } from '../LinkItem/LinkItem';

import styles from './Sidebar.module.scss';

export const Sidebar = ({ expanded }) => {
  return (
    <div className={styles.Sidebar} style={{ '--sidebar-size': expanded ? '230px' : '50px' }}>
      <div className={styles.SidebarInner}>
        <div className={styles.SidebarHeader}>
          <Link to="/" className={styles.SidebarHeaderLogoLink}>
            <b>CRM</b>
            {expanded && 'SYSTEM'}
          </Link>
        </div>
        <div className={styles.SidebarItems}>
          {routes.map((item) => (
            <LinkItem
              key={item.path}
              path={item.path}
              title={item.title}
              iconName={item.iconName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
