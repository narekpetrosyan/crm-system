import React from 'react';
import { Icon } from '@components/Icon/Icon';
import { Button, IconButton } from '@mui/material';

import styles from './Header.module.scss';

export const Header = ({ logoutHandler, showMenu }) => {
  return (
    <div className={styles.Header}>
      <div className={styles.InnerHeader}>
        <IconButton onClick={showMenu}>
          <Icon name="menu" size={0.8} />
        </IconButton>

        <Button
          variant="outlined"
          color="inherit"
          className={styles.LogoutButton}
          startIcon={<Icon name="turn-off" size={0.6} />}
          onClick={logoutHandler}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};
