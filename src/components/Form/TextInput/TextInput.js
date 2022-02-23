import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { Icon } from '../../Icon/Icon';

import styles from './TextInput.module.scss';

export const TextInput = memo(
  ({
    type,
    name,
    label,
    className,
    iconName,
    withIcon = false,
    withTopLabel = false,
    disabled = false,
  }) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className={clsx(styles.InputWrapper, className)}>
        {withTopLabel && <p className={styles.SelectInputLabel}>{label}</p>}
        <div className={styles.InputBlock}>
          <input
            type={type}
            {...register(name)}
            style={{ '--padding-right': withIcon ? '30px' : 0 }}
            className={clsx(styles.InputText, errors[name]?.message && styles.InputTextError)}
            id={name}
            placeholder={label}
            disabled={disabled}
          />
          {withIcon && <Icon className={styles.InputIcon} name={iconName} size={0.8} />}
        </div>
        {errors[name]?.message && (
          <span className={styles.InputErrorMessage}>{errors[name]?.message}</span>
        )}
      </div>
    );
  },
);
