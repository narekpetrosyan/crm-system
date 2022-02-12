import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import styles from './CheckboxLabel.module.scss';

export const CheckboxLabel = ({ label, name, value, className, size = 14 }) => {
  const { register } = useFormContext();
  return (
    <div className={className}>
      <FormControlLabel
        classes={{
          label: styles.CheckboxLabel,
        }}
        style={{ '--f-size': `${size}px` }}
        value={value}
        {...register(name)}
        control={<Checkbox />}
        label={label}
      />
    </div>
  );
};
