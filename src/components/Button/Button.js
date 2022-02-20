import React, { memo } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export const Button = memo(
  ({
    children,
    clickHandler,
    className,
    size,
    type = 'submit',
    color = 'common',
    disabled = false,
  }) => {
    return (
      <button
        className={clsx(styles.Button, styles[`Button_${color}`], className)}
        style={{ '--btn-size': size ? `${size}px` : '100%' }}
        type={type}
        onClick={clickHandler}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);
