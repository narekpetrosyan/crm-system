import React, { useEffect, memo, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useStore } from '@hooks/useStore';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { Button } from '@components/Button/Button';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';

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

  const { reset, control } = form;

  useEffect(() => {
    reset(citiesStore.city);
  }, [citiesStore.city]);

  const submitForm = (data) => {
    citiesStore.saveCity(data, id);
    reset({}, { keepValues: false });
  };

  return (
    <InnerLayout>
      <PageHeading title="Редактирование города" />

      <div className={styles.CitiesInnerBody}>
        {!citiesStore.isLoading && (
          <FormProvider {...form}>
            <form>
              <div className={styles.FormInputs}>
                <TextInput control={control} type="text" name="name" label="Название" id="name" />
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      <div className={styles.CitiesInnerSave}>
        <Button color="submit" clickHandler={form.handleSubmit(submitForm)} size={120}>
          Сохранить
        </Button>
      </div>
    </InnerLayout>
  );
});

export default memo(EditCity);
