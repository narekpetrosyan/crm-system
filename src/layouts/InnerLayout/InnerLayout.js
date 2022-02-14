import React from 'react';

import styles from './InnerLayout.module.scss';

const InnerLayout = ({ children }) => {
  return (
    <div className={styles.InnerLayoutWrapper}>
      <div className={styles.InnerLayoutInner}>{children}</div>
    </div>
  );
};

export default InnerLayout;
