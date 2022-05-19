import React, { memo } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm, FormProvider } from 'react-hook-form';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { Button } from '@components/Button/Button';
import DateInput from '@components/Form/DateInput/DateInput';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { CheckboxLabel } from '@components/Form/CheckboxLabel/CheckboxLabel';
import { useStore } from '@hooks/useStore';
import { useCaValues } from '../hooks/useCaValues';

import styles from './CreateOrder.module.scss';

const CreateOrder = observer(() => {
  const { ordersStore } = useStore();

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      contragent_id: '',
      object_id: '',
      contact_id: '',
      phone: '',
      price: '',
      w_price: '',
      objectList: [],
      contactList: [],
      contragentList: [],
      work_type: '',
      price_for_worker: 0,
      price_for_worker_sec: 0,
      end_time: '',
      start_time: '',
      is_payment: false,
      workers: {
        workers: [],
        unavailable: [],
        reserved: [],
        rejected: [],
      },
      start_work_day: 0,
    },
  });

  const { setValue, control } = form;

  const {
    contrAgents,
    contrAgentsLoading,
    caObjectsLoading,
    caObjects,
    caOContactList,
    caOContactListLoading,
  } = useCaValues(control, setValue);

  const submitForm = (data) => {
    ordersStore.createOrder({
      ...data,
      object_id: data.object_id.value,
      work_type: 'PER_HOUR',
      contact_id: data.contact_id.value,
      contragent_id: data.contragent_id.value,
    });
  };

  return (
    <InnerLayout>
      <PageHeading title="Добавить заказ" />
      <div className={styles.CreateOrderInnerBody}>
        <FormProvider {...form}>
          <div className={styles.CreateOrderForm}>
            <div className={styles.CreateOrderFormBlock}>
              <SelectInput
                name="contragent_id"
                loading={contrAgentsLoading}
                options={contrAgents}
                withTopLabel
                label="Контрагент"
              />
              <SelectInput
                withTopLabel
                label="Объект"
                loading={caObjectsLoading}
                name="object_id"
                options={caObjects}
              />
              <SelectInput
                withTopLabel
                label="Контактное лицо"
                name="contact_id"
                options={caOContactList}
                loading={caOContactListLoading}
              />
              <TextInput control={control} name="phone" withTopLabel label="Телефон" disabled />
              <TextInput
                control={control}
                type="number"
                name="price"
                withTopLabel
                label="Ставка заказчик"
              />
            </div>

            <div className={styles.CreateOrderFormBlock}>
              <TextInput
                control={control}
                type="number"
                name="w_price"
                withTopLabel
                label="Ставка работник"
              />
              <DateInput variant="datetime" name="start_time" label="Начало смены" />
              <DateInput variant="datetime" name="end_time" label="Окончание смены" />
              <CheckboxLabel name="is_payment" label="Оплачено заказчиком" />
            </div>

            <div>
              <TextAreaInput
                resizable={false}
                withTopLabel
                label="Комментарий"
                name="comment"
                size={[2, 3]}
              />
            </div>

            <div className={styles.CreateOrderFormBlock}>
              <Button
                color="submit"
                clickHandler={form.handleSubmit(submitForm)}
                size={150}
                disabled={ordersStore.isLoading}
                loading={ordersStore.isLoading}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default memo(CreateOrder);
