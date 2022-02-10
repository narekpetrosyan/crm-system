import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Users.module.scss';

export const Users = () => {
  return (
    <div className={styles.UsersWrapper}>
      <div className={styles.UsersInner}>
        <Outlet />
      </div>
    </div>
  );
};
