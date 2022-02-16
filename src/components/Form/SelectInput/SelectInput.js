import React, { useMemo } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';

import styles from './SelectInput.module.scss';

export const SelectInput = ({
  name,
  options,
  label,
  className,
  size = 200,
  withTopLabel = false,
}) => {
  const { register, setValue, formState, getValues } = useFormContext();

  const defaultSelected = useMemo(
    () => options.filter((item) => item.value === getValues(name)),
    [getValues(name)],
  );

  return (
    <div className={clsx(styles.SelectInputWrapper, className)}>
      {withTopLabel && <p className={styles.SelectInputLabel}>{label}</p>}
      <Select
        styles={{
          control: (base) => ({
            ...base,
            border: formState.errors[name] && '1px solid red',
            minHeight: 34,
            height: 34,
          }),
          container: (provided) => ({
            ...provided,
            width: size,
            minHeight: 34,
            height: 34,
          }),
        }}
        options={options}
        {...register(name)}
        onChange={(val) => setValue(name, val.value)}
        placeholder={label}
        defaultValue={defaultSelected}
      />
      {formState.errors[name]?.message && (
        <span className={styles.HelperText}>{formState.errors[name]?.message}</span>
      )}
    </div>
  );
};
