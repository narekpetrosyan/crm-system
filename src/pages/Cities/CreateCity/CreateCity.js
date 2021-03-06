import React, { memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/Button/Button';
import PageHeading from '@components/PageHeading/PageHeading';
import { useStore } from '@hooks/useStore';
import { TextInput } from '@components/Form/TextInput/TextInput';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';

import styles from './CreateCity.module.scss';

const CreateCity = () => {
  const { citiesStore } = useStore();

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
    },
  });

  const { control, reset } = form;

  const submitForm = (data) => {
    citiesStore.createCity(data);
    reset({}, { keepValues: false });
  };

  return (
    <InnerLayout>
      <PageHeading title="Редактирование города" />

      <div className={styles.CitiesInnerBody}>
        <FormProvider {...form}>
          <form>
            <div className={styles.FormInputs}>
              <TextInput control={control} type="text" name="name" label="Название" id="name" />
            </div>
          </form>
        </FormProvider>
      </div>

      <div className={styles.CitiesInnerSave}>
        <Button
          color="submit"
          size={150}
          clickHandler={form.handleSubmit(submitForm)}
          disabled={citiesStore.isLoading}
          loading={citiesStore.isLoading}
        >
          Сохранить
        </Button>
      </div>
    </InnerLayout>
  );
};

export default memo(CreateCity);
