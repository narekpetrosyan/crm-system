import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { TextField } from '@mui/material';
import { Icon } from '../../Icon/Icon';

import styles from './TextInput.module.scss';

export const TextInput = ({ type, name, label, className, id, withIcon = false, iconName }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(styles.InputWrapper, className)}>
      <TextField
        {...register(name)}
        type={type}
        size="small"
        style={{ '--padding-right': withIcon ? '30px' : 0 }}
        variant="outlined"
        InputProps={{
          className: styles.InputText,
        }}
        fullWidth
        id={id}
        label={label}
        error={!!errors[name]?.message}
        helperText={errors[name]?.message}
      />
      {withIcon && <Icon className={styles.InputIcon} name={iconName} size={0.8} />}
    </div>
  );
};
