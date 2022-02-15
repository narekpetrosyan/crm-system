import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.NotFoundWrapper}>
      <Typography variant="h4">Page Not Found</Typography>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
