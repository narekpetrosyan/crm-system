import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';
import { Icon } from '../Icon/Icon';

import styles from './LinkItem.module.scss';

export const LinkItem = observer(({ title, iconName, path }) => {
  const {
    uiStore: { expanded },
  } = useStore();
  return (
    <div className={styles.LinkItem}>
      <NavLink
        to={path}
        className={!expanded ? styles.WhenExpanded : styles.WhenNotExpanded}
        activeClassName={styles.LinkItemActive}
      >
        <Icon name={iconName} size={0.8} />
        {expanded && <p>{title}</p>}
      </NavLink>
    </div>
  );
});
