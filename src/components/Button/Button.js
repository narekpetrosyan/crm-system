import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export const Button = ({ children, disabled = false, clickHandler, color, className }) => {
  return (
    <button
      className={clsx(styles.Button, styles[`Button_${color}`], className)}
      type="submit"
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
