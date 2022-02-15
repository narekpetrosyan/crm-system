import React, { useCallback, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Loader from '@components/Loader/Loader';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';

import styles from './MainOrders.module.scss';

const MainOrders = observer(() => {
  const { ordersStore } = useStore();

  useEffect(() => {
    if (!ordersStore.orders.length) {
      ordersStore.fetchOrders();
    }
  }, []);

  const headingButtonAction = useCallback(() => history.push('/orders/create'), []);
  const pushHistory = useCallback((id) => history.push(`/orders/edit/${id}`), []);
  const removeOrder = useCallback((id) => ordersStore.removeOrder(id), []);
  const setOnRemove = useCallback((id) => ordersStore.setOnRemove(id), []);
  const recoverOrder = useCallback((id) => ordersStore.setOnRemove(id, true), []);

  const getRowStyle = useCallback(({ data }) => {
    return data.is_fully_paid ? { background: '#dff0d8' } : { background: '#ebcccc' };
  }, []);

  return (
    <InnerLayout>
      <PageHeading
        title="Заказы"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <div className={clsx(styles.OrdersInnerBody, 'ag-theme-alpine')}>
        {!ordersStore.isLoading ? (
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              flex: 1,
              sortable: true,
              suppressMovable: true,
              resizable: true,
              cellStyle: { fontSize: '12px', fontWeight: '600' },
            }}
            getRowStyle={getRowStyle}
            rowData={ordersStore.orders}
          >
            <AgGridColumn field="id" headerName="ID" hide />
            <AgGridColumn field="id" headerName="Номер заказа" maxWidth={90} />
            <AgGridColumn field="created_at" headerName="Дата создания" />
            <AgGridColumn field="contragent" headerName="Контрагент" />
            <AgGridColumn field="object" headerName="Наименование объекта" />
            <AgGridColumn field="status" headerName="Статус" />
            <AgGridColumn field="city" headerName="Город" />
            <AgGridColumn field="start_time" headerName="Дата начала" />
            <AgGridColumn field="deleted_at" headerName="На удаление" />
            <AgGridColumn
              field="actions"
              headerName=""
              cellRenderer={({ data }) => (
                <AgActionButtons
                  data={data}
                  editAction={pushHistory}
                  removeAction={removeOrder}
                  withThirdButton
                  thirdIconName={!data.deleted_at ? 'delete' : 'check'}
                  thirdAction={!data.deleted_at ? setOnRemove : recoverOrder}
                />
              )}
            />
          </AgGridReact>
        ) : (
          <Loader />
        )}
      </div>
    </InnerLayout>
  );
});

export default MainOrders;
