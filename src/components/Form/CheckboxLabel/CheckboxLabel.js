import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

import styles from './CheckboxLabel.module.scss';

export const CheckboxLabel = ({ label, className }) => {
  return (
    <div className={className}>
      <FormControlLabel
        classes={{
          label: styles.CheckboxLabel,
        }}
        control={<Checkbox />}
        label={label}
      />
    </div>
  );
};
