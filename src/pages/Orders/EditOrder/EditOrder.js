import React, { memo, useEffect, useState } from 'react';
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
import { PickWorker } from './PickWorker/PickWorker';
import { WorkersTable } from './WorkersTable/WorkersTable';

import styles from '../CreateOrder/CreateOrder.module.scss';

const EditOrder = observer(() => {
  const [workers, setWorkers] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const { id } = useParams();
  const { ordersStore, workersStore } = useStore();

  const handleFilter = (val = 'ALL') => {
    setFilterType(val);
    if (val === 'ALL') {
      workersStore.orderWorkers = workersStore.orderWorkers;
      return;
    }
    if (workersStore.orderWorkers.length === 0) return;
    workersStore.orderWorkers = workersStore.orderWorkers.filter((el) => el.status_en === val);
  };

  useEffect(() => {
    return () => {
      setWorkers([]);
      workersStore.orderWorkersInSmen = [];
    };
  }, []);

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      ...ordersStore.order,
      is_payment: ordersStore.order?.is_fully_paid,
      workers: [],
    },
  });
  const { control, setValue, getValues } = form;

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
      work_type: 'PER_HOUR',
      contact_id: data.contact_id.value,
      contragent_id: data.contragent_id.value,
      user_id: data.user_id.value,
      is_fully_paid: data.is_payment,
      workers: data.workers,
    });
  };

  const clickSelectButton = (id) => {
    setValue('workers', [
      ...getValues('workers'),
      workersStore.orderWorkers.find((el) => el.id === id),
    ]);
    workersStore.setWorkersInSmen(workersStore.orderWorkers.find((el) => el.id === id));
    workersStore.orderWorkers = workersStore.orderWorkers.filter((el) => el.id !== id);
  };

  if (ordersStore.isLoading) return <Loader />;

  return (
    <InnerLayout>
      <PageHeading title={`Редактирование заказа №${id} Дата: ${ordersStore?.order?.created_at}`} />
      <div className={styles.CreateOrderInnerBody}>
        <FormProvider {...form}>
          <EditForm control={control} order={ordersStore.order} />
        </FormProvider>
        <PickWorker orderId={id} />

        <div>
          <WorkersTable
            rowData={workersStore.orderWorkers}
            isLoading={workersStore.isLoadingFF}
            filterHandler={handleFilter}
            selectButtonHandler={clickSelectButton}
            showWorkingTable={filterType === 'WORKING'}
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
          {ordersStore.order?.is_fully_paid && (
            <Button color="submit" clickHandler={downloadXLSXFile} size={150}>
              Закрыть смену
            </Button>
          )}
          <Button color="submit" clickHandler={downloadXLSXFile} size={150}>
            Скачать XLSX
          </Button>
        </div>
      </div>
    </InnerLayout>
  );
});

export default memo(EditOrder);
