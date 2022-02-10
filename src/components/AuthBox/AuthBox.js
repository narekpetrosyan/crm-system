import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthBox.module.scss';

export const AuthBox = ({ children }) => {
  return (
    <div className={styles.BoxWrapper}>
      <div className={styles.BoxWrapperLogo}>
        <Link to="/" className={styles.BoxWrapperLogoLink}>
          <b>CRM</b>
          SYSTEM
        </Link>
      </div>
      <div className={styles.BoxWrapperBlock}>{children}</div>
    </div>
  );
};
