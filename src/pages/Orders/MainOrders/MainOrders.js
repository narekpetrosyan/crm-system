import React, { useCallback, useEffect, memo, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import Table from '@components/Table/Table';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import { getTableColumns } from './helpers/getTableColumns';

const MainOrders = observer(() => {
  const { ordersStore, authStore } = useStore();

  useEffect(() => {
    ordersStore.fetchOrders();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/orders/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/orders/edit/${id}`),
      removeAction: (id) => ordersStore.removeOrder(id),
      setOnRemoveAction: (id) => ordersStore.setOnRemove(id),
      recoverAction: (id) => ordersStore.setOnRemove(id, true),
      showEdit: authStore.transformedPermissions.includes('edit.orders'),
      showRemove: authStore.transformedPermissions.includes('delete.orders'),
      withThirdButton: authStore.transformedPermissions.includes('softdelete.orders'),
    }),
    [],
  );

  const getRowStyle = useCallback(({ data }) => {
    return data.is_fully_paid ? { background: '#dff0d8' } : { background: '#ebcccc' };
  }, []);

  return (
    <InnerLayout>
      <PageHeading
        title="Заказы"
        withButton={authStore.transformedPermissions.includes('create.orders')}
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={ordersStore.isLoading}
        rowData={ordersStore.orders}
        cellRendererProps={cellRendererProps}
        getRowStyle={getRowStyle}
        columns={getTableColumns}
        withCellRenderer={
          authStore.transformedPermissions.includes('edit.orders') ||
          authStore.transformedPermissions.includes('delete.orders') ||
          authStore.transformedPermissions.includes('softdelete.orders')
        }
      />
    </InnerLayout>
  );
});

export default memo(MainOrders);
