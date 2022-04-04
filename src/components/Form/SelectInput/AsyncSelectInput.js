import React, { useCallback } from 'react';
import clsx from 'clsx';
import AsyncSelect from 'react-select/async';
import { useFormContext } from 'react-hook-form';
import { useSelectOptions } from '../../../hooks/useSelectOptions';

import styles from './SelectInput.module.scss';

export const AsyncSelectInput = ({
  name,
  label,
  className,
  size = 200,
  value,
  withTopLabel = false,
}) => {
  const { searchByText, isLoading } = useSelectOptions();
  const { register, setValue, formState } = useFormContext();

  const setSelectValue = useCallback((val) => {
    if (value) {
      setValue(name, value);
    } else {
      setValue(name, val.value);
    }
  }, []);

  return (
    <div className={clsx(styles.SelectInputWrapper, className)}>
      {withTopLabel && <p className={styles.SelectInputLabel}>{label}</p>}
      <AsyncSelect
        styles={{
          control: (base) => ({
            ...base,
            border: formState.errors[name] && '1px solid red',
            minHeight: 34,
            height: 34,
            borderRadius: 'none',
          }),
          container: (provided) => ({
            ...provided,
            width: size,
            minHeight: 34,
            height: 34,
          }),
        }}
        cacheOptions
        defaultOptions
        loadOptions={searchByText}
        isLoading={isLoading}
        {...register(name)}
        onChange={setSelectValue}
        placeholder={label}
        value={value}
        onInputChange={(val) => searchByText(val)}
      />
      {formState.errors[name]?.message && (
        <span className={styles.HelperText}>{formState.errors[name]?.message}</span>
      )}
    </div>
  );
};
