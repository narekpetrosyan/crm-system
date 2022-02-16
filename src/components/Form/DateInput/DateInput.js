import React, { memo } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import styles from './DateInput.module.scss';

const DateInput = ({ name, className, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(styles.DateInputWrapper, className)}>
      <label htmlFor={name}>{label}</label>
      <input type="date" {...register(name)} id={name} />
      {!!errors[name]?.message && <p>{!!errors[name]?.message}</p>}
    </div>
  );
};

export default memo(DateInput);
