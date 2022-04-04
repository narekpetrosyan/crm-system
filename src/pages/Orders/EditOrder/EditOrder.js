import React, { memo, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Loader from '@components/Loader/Loader';
import { Button } from '@components/Button/Button';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import DateInput from '@components/Form/DateInput/DateInput';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import TextAreaInput from '@components/Form/TextAreaInput/TextAreaInput';
import { CheckboxLabel } from '@components/Form/CheckboxLabel/CheckboxLabel';
import { AsyncSelectInput } from '@components/Form/SelectInput/AsyncSelectInput';
import { workTypes } from '@utils/helpers/staticSeletcData';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { useSelectOptions } from '@hooks/useSelectOptions';
import { useStore } from '@hooks/useStore';
import { $authHost } from '../../../http';

import styles from '../CreateOrder/CreateOrder.module.scss';

const EditOrder = observer(() => {
  const { id } = useParams();
  const { ordersStore } = useStore();
  const { isLoading, searchContrAgentByName, filteredContrAgents } = useSelectOptions();
  const [selectedOption, setSelectedOption] = useState(null);

  const form = useForm({
    mode: 'onSubmit',
  });
  const { control, watch, reset, getValues, setValue } = form;

  useEffect(() => {
    if (id)
      ordersStore.getOrderById(id).then(() => {
        searchContrAgentByName(ordersStore.order?.contragent?.name).then((data) => {
          setSelectedOption(data[0]);
        });
      });
  }, []);

  const watchContrAgentId = watch('contragent_id');
  const watchObjectId = watch('object_id')?.value;
  const watchContactId = watch('contact_id')?.value;

  useEffect(() => {
    reset({
      ...ordersStore.order,
      contragent_id: ordersStore.order?.ob?.contragent_id,
      w_price: ordersStore.order?.price_for_worker,
      comment: ordersStore.order?.contragent?.comment,
      objectList: filteredContrAgents.find((item) => item.id === watchContrAgentId)?.objects,
      contactList: getValues('objectList')?.filter((item) => item.id !== watchObjectId)[0]
        ?.contacts,
      price: filteredContrAgents.find((item) => item.id === watchContrAgentId)?.price,
    });
  }, [ordersStore.order, watchContrAgentId, watchObjectId, watchContactId]);

  useEffect(() => {
    setValue('phone', getValues('contactList')?.find((item) => item.id === watchContactId)?.phone);
  }, [watchContactId]);

  const downloadXLSXFile = async () => {
    const { data } = await $authHost.get(`/orders/export/${ordersStore.order.id}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  const submitForm = (data) => {
    ordersStore.saveOrder(id, {
      ...data,
      object_id: data.object_id.value,
      work_type: data.work_type.value,
      contact_id: data.contact_id.value,
    });
  };

  if (ordersStore.isLoading || isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title={`Редактирование заказа №${id} Дата: ${ordersStore?.order?.created_at}`} />
      <div className={styles.CreateOrderInnerBody}>
        <FormProvider {...form}>
          <div className={styles.CreateOrderForm}>
            <div className={styles.CreateOrderFormBlock}>
              <AsyncSelectInput
                name="contragent_id"
                value={selectedOption}
                loading={isLoading}
                asyncSearch={searchContrAgentByName}
                withTopLabel
                label="Контрагент"
                isLoading={isLoading}
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

            <div>
              <SelectInput
                size={250}
                name="asasa"
                withTopLabel
                label="Ответственный менеджер"
                options={transformForSelect(ordersStore.order?.users, 'id', 'name')}
              />
            </div>

            <div className={styles.CreateOrderFormBlock}>
              <Button color="submit" clickHandler={form.handleSubmit(submitForm)} size={150}>
                Сохранить
              </Button>
              <Button color="submit" clickHandler={downloadXLSXFile} size={150}>
                Скачать XLSX
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default memo(EditOrder);
