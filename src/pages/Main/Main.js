import { Typography } from '@mui/material';
import React from 'react';

import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div>
      <div className={styles.MainWrapper}>
        <Typography variant="h1">Dashboard</Typography>
        <p>You are logged in!</p>
      </div>
    </div>
  );
};
