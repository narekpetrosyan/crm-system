import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import styles from './CheckboxLabel.module.scss';

export const CheckboxLabel = ({ label, name, value, className, size = 14 }) => {
  const { register, getValues } = useFormContext();

  const arr = getValues(name);

  const isChecked = Array.isArray(arr) && arr?.includes(value);

  return (
    <div className={clsx(styles.CheckBoxWrapper, className)}>
      <input
        type="checkbox"
        defaultValue={value}
        checked={isChecked}
        {...register(name)}
        id={label}
        style={{ '--f-size': `${size}px` }}
      />
      <label htmlFor={label} className={styles.CheckboxLabel}>
        {label}
      </label>
    </div>
  );
};
