import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '@components/Heading/Heading';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.NotFoundWrapper}>
      <Heading variant="h2">Page Not Found</Heading>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
