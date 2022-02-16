import React, { useMemo } from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

import styles from './SelectInput.module.scss';
import clsx from 'clsx';

export const SelectInput = ({ name, options, label, className }) => {
  const { register, setValue, formState, getValues } = useFormContext();

  const defaultSelected = useMemo(
    () => options.filter((item) => item.value === getValues(name)),
    [getValues(name)],
  );

  return (
    <div className={clsx(styles.SelectInputWrapper, className)}>
      <Select
        styles={{
          control: (base) => ({
            ...base,
            border: formState.errors[name] && '1px solid red',
          }),
          container: (provided) => ({
            ...provided,
            width: 200,
          }),
        }}
        options={options}
        {...register(name)}
        onChange={(val) => setValue(name, val.value)}
        placeholder={label}
        defaultValue={defaultSelected}
      />
      {formState.errors[name]?.message && (
        <FormHelperText className={styles.HelperText}>
          {formState.errors[name]?.message}
        </FormHelperText>
      )}
    </div>
  );
};
