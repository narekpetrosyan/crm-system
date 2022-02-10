import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';
import { Icon } from '../Icon/Icon';

import styles from './LinkItem.module.scss';

export const LinkItem = observer(({ title, iconName, path }) => {
  const {
    uiStore: { expanded },
  } = useStore();
  return (
    <div className={styles.LinkItem}>
      {!expanded ? (
        <Link to={path} className={styles.WhenExpanded}>
          <Icon name={iconName} size={0.8} />
        </Link>
      ) : (
        <Link to={path} className={styles.WhenNotExpanded}>
          <Icon name={iconName} size={0.8} />
          <p>{title}</p>
        </Link>
      )}
    </div>
  );
});
