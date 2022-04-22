import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import CreatableSelect from 'react-select/creatable';
import { useController, useFormContext } from 'react-hook-form';

import styles from './SelectInput.module.scss';

export const CreatableSelectInput = observer(
  ({ name, label, className, options, size = 200, withTopLabel = false }) => {
    const { control } = useFormContext();

    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({ name, control });

    return (
      <div className={clsx(styles.SelectInputWrapper, className)}>
        {withTopLabel && <p className={styles.SelectInputLabel}>{label}</p>}
        <CreatableSelect
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
          placeholder={label}
          noOptionsMessage={() => 'Отсутствуют элементы для выбора'}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onCreateOption={(value) => {
            onChange({
              label: value,
              value,
              isNew: true,
            });
          }}
        />
        {error?.message && <span className={styles.HelperText}>{error?.message}</span>}
      </div>
    );
  },
);
