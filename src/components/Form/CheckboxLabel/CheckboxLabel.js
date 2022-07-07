import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import styles from './CheckboxLabel.module.scss';

export const CheckboxLabel = ({
  label,
  name,
  value,
  className,
  size = 14,
  handleChange,
  ...rest
}) => {
  const { register } = useFormContext();

  const regField = register(name);

  return (
    <div className={clsx(styles.CheckBoxWrapper, className)}>
      <input
        type="checkbox"
        {...regField}
        onChange={(e) => {
          regField.onChange(e);
          handleChange(e);
        }}
        defaultValue={value}
        id={label}
        {...rest}
        style={{ '--f-size': `${size}px` }}
      />
      <label htmlFor={label} className={styles.CheckboxLabel}>
        {label}
      </label>
    </div>
  );
};
