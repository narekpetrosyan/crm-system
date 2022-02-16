import React, { memo } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export const Button = memo(
  ({ children, disabled = false, clickHandler, color = 'common', className, size }) => {
    return (
      <button
        className={clsx(styles.Button, styles[`Button_${color}`], className)}
        style={{ '--btn-size': size ? `${size}px` : '100%' }}
        type="submit"
        onClick={clickHandler}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);
