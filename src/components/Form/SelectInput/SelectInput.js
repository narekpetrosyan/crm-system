import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { useController, useFormContext } from 'react-hook-form';
import Loader from '../../Loader/Loader';

import styles from './SelectInput.module.scss';

export const SelectInput = ({
  name,
  options,
  label,
  className,
  size = 200,
  withTopLabel = false,
  isLoading = false,
}) => {
  const { getValues, control, setValue } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const defaultSelected = useMemo(
    () => options.find((item) => item.value === getValues(name)),
    [getValues(name)],
  );

  useEffect(() => {
    if (defaultSelected) {
      setValue(name, defaultSelected);
    }
  }, [defaultSelected]);

  if (isLoading) return <Loader />;

  return (
    <div className={clsx(styles.SelectInputWrapper, className)}>
      {withTopLabel && <p className={styles.SelectInputLabel}>{label}</p>}
      <Select
        styles={{
          control: (base) => ({
            ...base,
            border: error?.message && '1px solid red',
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
        options={options}
        name={name}
        // onChange={onChange}
        placeholder={label}
        // value={value}
        {...field}
      />
      {error?.message && <span className={styles.HelperText}>{error?.message}</span>}
    </div>
  );
};
