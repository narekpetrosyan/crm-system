import React from 'react';
import { ScaleLoader } from 'react-spinners';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <ScaleLoader size={150} color="#1976d2" />
    </div>
  );
};

export default Loader;
