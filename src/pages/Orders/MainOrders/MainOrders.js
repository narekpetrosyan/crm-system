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
    if (!ordersStore.orders.length) {
      ordersStore.fetchOrders();
    }
  }, []);

  const headingButtonAction = useCallback(() => history.push('/orders/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/orders/edit/${id}`),
      removeAction: (id) => ordersStore.removeOrder(id),
      setOnRemoveAction: (id) => ordersStore.setOnRemove(id),
      recoverAction: (id) => ordersStore.setOnRemove(id, true),
      showEdit: authStore.transformedPermissions.includes(15),
      showRemove: authStore.transformedPermissions.includes(16),
      withThirdButton: authStore.transformedPermissions.includes(24),
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
        withButton={authStore.transformedPermissions.includes(14)}
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
          authStore.transformedPermissions.includes(15) ||
          authStore.transformedPermissions.includes(16) ||
          authStore.transformedPermissions.includes(24)
        }
      />
    </InnerLayout>
  );
});

export default memo(MainOrders);
