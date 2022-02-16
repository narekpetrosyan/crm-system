import React from 'react';
import { Icon } from '@components/Icon/Icon';
import { Button } from '@components/Button/Button';

import styles from './Header.module.scss';

export const Header = ({ logoutHandler, showMenu }) => {
  return (
    <div className={styles.Header}>
      <div className={styles.InnerHeader}>
        <Button clickHandler={showMenu} size={60}>
          <Icon name="menu" size={0.8} />
        </Button>

        <Button className={styles.LogoutButton} clickHandler={logoutHandler} size={120}>
          <Icon name="turn-off" size={0.7} />
          Log out
        </Button>
      </div>
    </div>
  );
};
