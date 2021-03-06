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
      <PageHeading title="???????????????? ??????????????????" />

      <div className={styles.InnerCreateWorker}>
        <FormProvider {...form}>
          <form>
            <div className={styles.CreateWorkerFormBlock}>
              <TextInput control={control} name="surname" label="??????????????" withTopLabel />
              <TextInput control={control} name="name" label="??????" withTopLabel />
              <TextInput control={control} name="patronymic" label="????????????????" withTopLabel />
              <DateInput name="dt_birth" label="???????? ????????????????" />
              <SelectInput
                name="gender"
                label="??????"
                withTopLabel
                options={genderSelectData.slice(0, genderSelectData.length - 1)}
              />
              <DateInput name="created_at" label="???????? ??????????????????????" />
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <TextInput control={control} name="address" label="?????????? ????????????????????" withTopLabel />
              <CreatableSelectInput
                name="area"
                label="?????????? ????????????????????"
                withTopLabel
                options={workersStore.areas}
              />
              <TextInput control={control} type="number" name="phone" label="??????. 1" withTopLabel />
              <TextInput
                control={control}
                type="number"
                name="phone_dop"
                label="??????. 2"
                withTopLabel
              />
              <TextInput control={control} type="number" name="inn" label="??????" withTopLabel />
              <TextInput control={control} type="number" name="snils" label="??????????" withTopLabel />
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <TextInput
                control={control}
                name="address_reg"
                label="?????????? ??????????????????????"
                withTopLabel
              />
              <TextInput
                control={control}
                name="bank_name"
                label="???????????????????????? ??????????"
                withTopLabel
              />
              <TextInput
                control={control}
                type="number"
                name="number_card"
                label="?????????? ???"
                withTopLabel
              />
              <DateInput name="exp_date_medical_book" label="?????????????????? ????" />
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div className={styles.CreateWorkerFormBlockItem}>
                <SelectInput
                  size={400}
                  name="status"
                  label="???????????? ??????????????????"
                  withTopLabel
                  options={statusSelectData}
                />
              </div>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  type="number"
                  name="passport_number"
                  label="?????????????? (??????????)"
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
                  label="?????????????? (??????????)"
                  withTopLabel
                />
              </div>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  name="passport_issued"
                  label="?????? ??????????"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div className={styles.CreateWorkerFormBlockItem}>
                <DateInput name="passport_created_at" label="?????????? ??????????" />
              </div>
              <div className={styles.CreateWorkerFormBlockItem}>
                <TextInput
                  control={control}
                  name="passport_department_code"
                  label="?????? ??????????????????????????"
                  withTopLabel
                />
              </div>
            </div>
            <div className={styles.CreateWorkerFormBlock}>
              <div style={{ flex: 1 }}>
                <TextAreaInput name="comment" resizable={false} label="??????????????????????" size={[8, 4]} />
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
                ??????????????????
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default CreateWorker;
