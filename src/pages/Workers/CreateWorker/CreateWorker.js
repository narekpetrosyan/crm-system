import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm, FormProvider } from 'react-hook-form';
import Loader from '@components/Loader/Loader';
import { Button } from '@components/Button/Button';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import DateInput from '@components/Form/DateInput/DateInput';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { CreatableSelectInput } from '@components/Form/SelectInput/CreatableSelect';
import { genderSelectData, statusSelectData } from '@utils/helpers/staticSeletcData';
import { useStore } from '@hooks/useStore';

import styles from './CreateWorker.module.scss';

const CreateWorker = observer(() => {
  const { workersStore } = useStore();

  const form = useForm({
    defaultValues: {
      name: '',
      surname: '',
      patronymic: '',
      dt_birth: '',
      created_at: '',
      gender: 0,
      address: '',
      area: '',
      phone: '',
      phone_dop: '',
      blocked_at: null,
      address_reg: '',
      bank_name: '',
      number_card: '',
      exp_date_medical_book: '',
      status: '',
      passport_number: '',
      passport_series: '',
      passport_issued: '',
      passport_created_at: '',
      passport_department_code: '',
      comment: '',
      cropped: null,
      inn: '',
      snils: '',
    },
  });

  const { control } = form;

  useEffect(() => {
    workersStore.fetchAreas();
  }, []);

  const submitForm = (data) => {
    workersStore.createWorker({
      ...data,
      area: data.area.value,
      status: data.status.value || 'READY',
      gender: data.gender.value,
    });
  };

  if (workersStore.isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title="Добавить работника" />

      <div className={styles.InnerCreateWorker}>
        <FormProvider {...form}>
          <form>
            <div className={styles.CreateWorkerFormBlock}>
              <TextInput control={control} name="surname" label="Фамилия" withTopLabel />
              <TextInput control={control} name="name" label="Имя" withTopLabel />
              <TextInput control={control} name="patronymic" label="Отчество" withTopLabel />
              <DateInput name="dt_birth" label="Дата рождения" />
              <SelectInput
                name="gender"
                label="Пол"
                withTopLabel
                options={genderSelectData.slice(0, genderSelectData.length - 1)}
              />
              <DateInput name="created_at" label="Дата регистрации" />
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <TextInput control={control} name="address" label="Адрес проживания" withTopLabel />
              <CreatableSelectInput
                name="area"
                label="Район проживания"
                withTopLabel
                options={workersStore.areas}
              />
              <TextInput control={control} type="number" name="phone" label="Тел. 1" withTopLabel />
              <TextInput
                control={control}
                type="number"
                name="phone_dop"
                label="Тел. 2"
                withTopLabel
              />
              <TextInput control={control} type="number" name="inn" label="ИНН" withTopLabel />
              <TextInput control={control} type="number" name="snils" label="Снилс" withTopLabel />
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <TextInput
                control={control}
                name="address_reg"
                label="Адрес регистрации"
                withTopLabel
              />
              <TextInput
                control={control}
                name="bank_name"
                label="Наименование банка"
                withTopLabel
              />
              <TextInput
                control={control}
                type="number"
                name="number_card"
                label="Карта №"
                withTopLabel
              />
              <DateInput name="exp_date_medical_book" label="Медкнижка до" />
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div className={styles.CreateWorkerFormBlockItem}>
                <SelectInput
                  size={400}
                  name="status"
                  label="Статус работника"
                  withTopLabel
                  options={statusSelectData}
                />
              </div>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  type="number"
                  name="passport_number"
                  label="Паспорт (номер)"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  type="number"
                  name="passport_series"
                  label="Паспорт (серия)"
                  withTopLabel
                />
              </div>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  name="passport_issued"
                  label="Кем выдан"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div className={styles.CreateWorkerFormBlockItem}>
                <DateInput name="passport_created_at" label="Когда выдан" />
              </div>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  name="passport_department_code"
                  label="Код подразделения"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div style={{ flex: 1 }}>
                <TextAreaInput name="comment" resizable={false} label="Комментарий" size={[8, 4]} />
              </div>
            </div>

            <div className={styles.CreateWorkerFormBlock}>
              <Button
                color="submit"
                clickHandler={form.handleSubmit(submitForm)}
                size={150}
                disabled={workersStore.isLoading}
                loading={workersStore.isLoading}
              >
                Сохранить
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default CreateWorker;
