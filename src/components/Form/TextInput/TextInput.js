import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { Icon } from '../../Icon/Icon';

import styles from './TextInput.module.scss';

export const TextInput = memo(
  ({
    control,
    type,
    name,
    label,
    className,
    iconName,
    withIcon = false,
    withTopLabel = false,
    disabled = false,
    size,
  }) => {
    const {
      fieldState: { error },
      field,
    } = useController({ name, control });

    return (
      <div className={clsx(styles.InputWrapper, className)}>
        {withTopLabel && <p className={styles.SelectInputLabel}>{label}</p>}
        <div className={styles.InputBlock}>
          <input
            type={type}
            style={{ '--padding-right': withIcon ? '30px' : 0, width: size === 'sm' && 60 }}
            className={clsx(styles.InputText, error?.message && styles.InputTextError)}
            id={name}
            placeholder={label}
            disabled={disabled}
            {...field}
          />
          {withIcon && <Icon className={styles.InputIcon} name={iconName} size={0.8} />}
        </div>
        {error?.message && <span className={styles.InputErrorMessage}>{error?.message}</span>}
      </div>
    );
  },
);
