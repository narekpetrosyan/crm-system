import React, { memo, useEffect } from 'react';
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
import { AsyncSelectInput } from '@components/Form/SelectInput/AsyncSelectInput';
import { useStore } from '@hooks/useStore';
import { useSelectOptions } from '@hooks/useSelectOptions';
import { workTypes } from '@utils/helpers/staticSeletcData';
import { transformForSelect } from '@utils/helpers/transformForSelect';

import styles from './CreateOrder.module.scss';

const CreateOrder = observer(() => {
  const { isLoading, searchContrAgentByName, filteredContrAgents } = useSelectOptions();
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

  const { watch, getValues, reset, setValue, control } = form;

  const watchContrAgentId = watch('contragent_id');
  const watchObjectId = watch('object_id')?.value;
  const watchContactId = watch('contact_id')?.value;

  console.log(watchContrAgentId, watchObjectId, watchContactId);

  useEffect(() => {
    reset({
      ...getValues(),
      objectList: filteredContrAgents.find((item) => item.id === watchContrAgentId)?.objects,
      contactList: getValues('objectList')?.find((item) => item.id === watchObjectId)?.contacts,
      price: filteredContrAgents.find((item) => item.id === watchContrAgentId)?.price,
      w_price: filteredContrAgents.find((item) => item.id === watchContrAgentId)?.w_price,
    });
  }, [watchContrAgentId, watchObjectId]);

  useEffect(() => {
    setValue('phone', getValues('contactList')?.find((item) => item.id === watchContactId)?.phone);
  }, [watchContactId]);

  const submitForm = (data) => {
    ordersStore.createOrder({
      ...data,
      object_id: data.object_id.value,
      work_type: data.work_type.value,
      contact_id: data.contact_id.value,
    });
  };

  return (
    <InnerLayout>
      <PageHeading title="Добавить заказ" />
      <div className={styles.CreateOrderInnerBody}>
        <FormProvider {...form}>
          <div className={styles.CreateOrderForm}>
            <div className={styles.CreateOrderFormBlock}>
              <AsyncSelectInput
                name="contragent_id"
                loading={isLoading}
                asyncSearch={searchContrAgentByName}
                withTopLabel
                label="Контрагент"
              />
              <SelectInput
                withTopLabel
                label="Объект"
                name="object_id"
                options={transformForSelect(getValues('objectList'), 'id', 'name')}
              />
              <SelectInput
                withTopLabel
                label="Контактное лицо"
                name="contact_id"
                options={transformForSelect(getValues('contactList'), 'id', 'name')}
              />
              <TextInput control={control} name="phone" withTopLabel label="Телефон" disabled />
              <TextInput
                control={control}
                type="number"
                name="price"
                withTopLabel
                label="Ставка в час"
              />
            </div>

            <div className={styles.CreateOrderFormBlock}>
              <SelectInput
                name="work_type"
                options={workTypes}
                withTopLabel
                label="Единица измерения"
              />
              <TextInput
                control={control}
                type="number"
                name="w_price"
                withTopLabel
                label="Стоимость для работника"
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
