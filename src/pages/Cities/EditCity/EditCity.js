import React, { useEffect, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';

import styles from './EditCity.module.scss';

const EditCity = observer(() => {
  const { id } = useParams();
  const { citiesStore } = useStore();

  useEffect(() => {
    citiesStore.getCityById(id);
  }, [id]);

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: useMemo(
      () => ({
        name: citiesStore.city?.name,
      }),
      [citiesStore.city],
    ),
  });

  useEffect(() => {
    form.reset(citiesStore.city);
  }, [citiesStore.city]);

  const submitForm = (data) => {
    citiesStore.saveCity(data, id);
    form.reset({}, { keepValues: false });
  };

  return (
    <InnerLayout>
      <PageHeading title="Редактирование города" />

      <div className={styles.CitiesInnerBody}>
        {!citiesStore.isLoading && (
          <FormProvider {...form}>
            <form>
              <div className={styles.FormInputs}>
                <TextInput type="text" name="name" label="Название" id="name" />
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      <div className={styles.CitiesInnerSave}>
        <Button onClick={form.handleSubmit(submitForm)}>Сохранить</Button>
      </div>
    </InnerLayout>
  );
});

export default memo(EditCity);