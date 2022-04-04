import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Loader from '@components/Loader/Loader';
import { Button } from '@components/Button/Button';
import DateInput from '@components/Form/DateInput/DateInput';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { CreatableSelectInput } from '@components/Form/SelectInput/CreatableSelect';
import { genderSelectData, statusSelectData } from '@utils/helpers/staticSeletcData';
import { useStore } from '@hooks/useStore';

import styles from './EditWorker.module.scss';

const EditWorker = observer(() => {
  const { id } = useParams();
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

  const { control, setValue } = form;

  useEffect(() => {
    if (id) {
      workersStore.getWorkerById(id).then(() => {
        setValue('name', workersStore.worker.name);
        setValue('surname', workersStore.worker.surname);
        setValue('patronymic', workersStore.worker.patronymic);
        setValue('dt_birth', workersStore.worker.dt_birth);
        setValue('created_at', workersStore.worker.created_at);
        setValue('gender', workersStore.worker.gender);
        setValue('address', workersStore.worker.address);
        setValue('area', workersStore.worker?.area);
        setValue('phone', workersStore.worker.phone);
        setValue('phone_dop', workersStore.worker.phone_dop);
        setValue('address_reg', workersStore.worker.address_reg);
        setValue('bank_name', workersStore.worker.bank_name);
        setValue('number_card', workersStore.worker.number_card);
        setValue('exp_date_medical_book', workersStore.worker.exp_date_medical_book);
        setValue('status', workersStore.worker.status);
        setValue('passport_number', workersStore.worker.passport_number);
        setValue('passport_series', workersStore.worker.passport_series);
        setValue('passport_issued', workersStore.worker.passport_issued);
        setValue('passport_created_at', workersStore.worker.passport_created_at);
        setValue('passport_department_code', workersStore.worker.passport_department_code);
        setValue('comment', workersStore.worker.comment);
        setValue('inn', workersStore.worker.inn);
        setValue('snils', workersStore.worker.snils);
      });
    }
  }, []);

  useEffect(() => {
    form.reset(workersStore.worker);
  }, [workersStore.worker]);

  const submitForm = (data) => {
    workersStore.saveWorker(id, {
      ...data,
      area: data.area.value,
      status: data?.status.value,
      gender: data?.gender.value,
    });
  };

  if (workersStore.isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title="Редактировать работника" />

      <div className={styles.InnerEditWorker}>
        <FormProvider {...form}>
          <form>
            <div className={styles.EditWorkerFormBlock}>
              <TextInput control={control} name="surname" label="Фамилия" withTopLabel />
              <TextInput control={control} name="name" label="Имя" withTopLabel />
              <TextInput control={control} name="patronymic" label="Отчество" withTopLabel />
              <DateInput name="dt_birth" label="Дата рождения" />
              <SelectInput name="gender" label="Пол" withTopLabel options={genderSelectData} />
              <DateInput name="created_at" label="Дата регистрации" />
            </div>
            <div className={styles.EditWorkerFormBlock}>
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
            <div className={styles.EditWorkerFormBlock}>
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
            <div className={styles.EditWorkerFormBlock}>
              <div className={styles.EditWorkerFormBlockItem}>
                <SelectInput
                  size={400}
                  name="status"
                  label="Статус работника"
                  options={statusSelectData}
                  withTopLabel
                />
              </div>
              <div className={styles.EditWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  type="number"
                  name="passport_number"
                  label="Паспорт (номер)"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.EditWorkerFormBlock}>
              <div className={styles.EditWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  type="number"
                  name="passport_series"
                  label="Паспорт (серия)"
                  withTopLabel
                />
              </div>
              <div className={styles.EditWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  name="passport_issued"
                  label="Кем выдан"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.EditWorkerFormBlock}>
              <div className={styles.EditWorkerFormBlockItem}>
                <DateInput name="passport_created_at" label="Когда выдан" />
              </div>
              <div className={styles.EditWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  name="passport_department_code"
                  label="Код подразделения"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.EditWorkerFormBlock}>
              <div style={{ flex: 1 }}>
                <TextAreaInput name="comment" resizable={false} label="Комментарий" size={[8, 4]} />
              </div>
            </div>

            <div className={styles.EditWorkerFormBlock}>
              <Button color="submit" clickHandler={form.handleSubmit(submitForm)} size={150}>
                Сохранить
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default EditWorker;
