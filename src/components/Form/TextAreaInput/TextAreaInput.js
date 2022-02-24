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
  disabled = false,
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
            backgroundColor: disabled && '#eee',
            cursor: disabled && 'not-allowed',
          }}
          id={name}
          {...register(name)}
          cols={size[0]}
          rows={size[1]}
          className={clsx(styles.TextAreaInput, errors[name]?.message && styles.InputTextError)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {errors[name]?.message && (
        <span className={styles.InputErrorMessage}>{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default memo(TextAreaInput);
