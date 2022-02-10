import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Icon } from '../../Icon/Icon';

import styles from './TextInput.module.scss';

export const TextInput = ({ type, name, label, id, withIcon = false, iconName }) => {
  const { register, formState } = useFormContext();

  return (
    <div className={styles.InputWrapper}>
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
        error={!!formState.errors[name]?.message}
        helperText={formState.errors[name]?.message}
      />
      {withIcon && <Icon className={styles.InputIcon} name={iconName} size={0.8} />}
    </div>
  );
};
