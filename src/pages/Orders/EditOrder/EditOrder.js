import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Loader from '@components/Loader/Loader';
import { Button } from '@components/Button/Button';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import { useStore } from '@hooks/useStore';
import { $authHost } from '../../../http';
import EditForm from './EditForm';

import styles from '../CreateOrder/CreateOrder.module.scss';

const EditOrder = observer(() => {
  const { id } = useParams();
  const { ordersStore } = useStore();

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      ...ordersStore.order,
    },
  });
  const { control } = form;

  useEffect(() => {
    if (id) ordersStore.getOrderById(id);
  }, []);

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
      contragent_id: data.contragent_id.value,
      user_id: data.user_id.value,
    });
  };

  if (ordersStore.isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title={`Редактирование заказа №${id} Дата: ${ordersStore?.order?.created_at}`} />
      <div className={styles.CreateOrderInnerBody}>
        <FormProvider {...form}>
          <EditForm control={control} order={ordersStore.order} />

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
            <Button color="submit" clickHandler={downloadXLSXFile} size={150}>
              Скачать XLSX
            </Button>
          </div>
        </FormProvider>
      </div>
    </InnerLayout>
  );
});

export default memo(EditOrder);
