import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import styles from './CheckboxLabel.module.scss';

export const CheckboxLabel = ({ label, name, value, className, size = 14 }) => {
  const { register } = useFormContext();

  return (
    <div className={clsx(styles.CheckBoxWrapper, className)}>
      <input
        type="checkbox"
        {...register(name)}
        defaultValue={value}
        id={label}
        style={{ '--f-size': `${size}px` }}
      />
      <label htmlFor={label} className={styles.CheckboxLabel}>
        {label}
      </label>
    </div>
  );
};
