import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SelectInput } from '../../../../components/Form/SelectInput/SelectInput';
import { genderSelectData, yesNo } from '../../../../utils/helpers/staticSeletcData';
import { useStore } from '../../../../hooks/useStore';
import { Button } from '../../../../components/Button/Button';
import { useForm, FormProvider } from 'react-hook-form';

import styles from './PickWorker.module.scss';

export const PickWorker = observer(({ orderId }) => {
  const { workersStore } = useStore();
  const hookForm = useForm({
    defaultValues: {
      area: [],
    },
  });
  const { handleSubmit, control, setValue } = hookForm;

  const submitForm = handleSubmit((data) => {
    const dataToSend = {
      order_id: orderId,
      gender: data.gender.value,
      step: data.step.value,
      area: data.area?.length ? data.area?.map((el) => el?.value) : [],
    };
    workersStore.searchForOrderFilter(dataToSend);
  });

  useEffect(() => {
    workersStore.fetchAreas();
  }, []);

  useEffect(() => {
    setValue('gender', genderSelectData[0]);
    setValue('step', yesNo[0]);
    setValue('area', workersStore.areas?.[0]);
  }, [workersStore.areas]);

  return (
    <FormProvider {...hookForm}>
      <div className={styles.pickWorkerForm}>
        <div className={styles.InputItems}>
          <SelectInput
            control={control}
            withTopLabel
            label="Пол"
            options={genderSelectData}
            name="gender"
          />
          <SelectInput
            control={control}
            withTopLabel
            label="Оплата в два этапа"
            options={yesNo}
            name="step"
          />
          <SelectInput
            control={control}
            isMulti
            withTopLabel
            label="Район проживания"
            options={workersStore.areas}
            name="area[]"
          />
        </div>
        <Button
          className={styles.btn}
          type="submit"
          size={200}
          color="submit"
          clickHandler={submitForm}
        >
          Подобрать работника
        </Button>
      </div>
    </FormProvider>
  );
});
