import React, { memo } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import styles from './TextAreaInput.module.scss';

const TextAreaInput = ({
  name,
  className,
  label,
  placeholder,
  size = [8, 8],
  resizable = true,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(styles.TextAreaInputWrapper, className)}>
      <div className={styles.TextAreaInputBlock}>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
          style={{
            resize: !resizable && 'none',
          }}
          id={name}
          {...register(name)}
          cols={size[0]}
          rows={size[1]}
          className={styles.TextAreaInput}
          placeholder={placeholder}
        />
      </div>
      {errors[name]?.message && (
        <span className={styles.InputErrorMessage}>{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default memo(TextAreaInput);
