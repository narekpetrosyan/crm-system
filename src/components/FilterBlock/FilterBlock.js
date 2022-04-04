import React, { memo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/Button/Button';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';

import styles from './FilterBlock.module.scss';

const FilterBlock = ({ selectOptions, submitAction, resetAction, searchLabel, selectLabel }) => {
  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      status: '',
    },
  });

  const { control } = form;

  const submitForm = useCallback((data) => {
    submitAction({
      ...data,
      status: data?.status.value,
    });
  }, []);

  const resetFormAndData = useCallback(() => {
    resetAction();
    form.reset(
      {
        name: '',
        status: '',
      },
      { keepDefaultValues: false, keepValues: false },
    );
  }, []);

  return (
    <div className={styles.FilterBlockWrapper}>
      <FormProvider {...form}>
        <div className={styles.FormWrapper}>
          <form>
            <div className={styles.FormInputs}>
              <TextInput
                control={control}
                type="text"
                name="name"
                label={searchLabel}
                id="name"
                className={styles.SearchInput}
              />
              <SelectInput
                name="status"
                label={selectLabel}
                options={[{ value: '', label: 'Пусто' }, ...selectOptions]}
                className={styles.SearchSelect}
              />
            </div>
          </form>
          <div className={styles.FormButtons}>
            <Button clickHandler={form.handleSubmit(submitForm)} size={90} color="primary">
              Искать
            </Button>
            <Button clickHandler={resetFormAndData} size={100} color="warning">
              Сбросить
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default memo(FilterBlock);
