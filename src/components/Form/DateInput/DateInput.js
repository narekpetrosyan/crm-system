import React, { memo } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import styles from './DateInput.module.scss';

const dateInputTypes = {
  date: 'date',
  datetime: 'datetime-local',
};

const DateInput = ({ name, className, label, variant = 'date' }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(styles.DateInputWrapper, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        type={dateInputTypes[variant]}
        {...register(name)}
        id={name}
        className={errors[name]?.message && styles.InputDateError}
      />

      {!!errors?.[name]?.message && (
        <p className={styles.DateInputError}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default memo(DateInput);
