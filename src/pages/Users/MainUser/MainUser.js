import React, { useCallback, useEffect, useMemo, memo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Table from '@components/Table/Table';
import { convertTableData } from './helpers/convertTableData';
import { getTableColumns } from './helpers/getTableColumns';

const MainUser = observer(() => {
  const { usersStore, authStore } = useStore();

  useEffect(() => {
    usersStore.fetchUsers();
  }, []);

  console.log(
    authStore.transformedPermissions.includes(3) || authStore.transformedPermissions.includes(4),
  );

  const usersData = useMemo(() => convertTableData(usersStore.users), [usersStore.users]);

  const headingButtonAction = useCallback(() => history.push('/users/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/users/edit/${id}`),
      removeAction: (id) => usersStore.removeUser(id),
      showEdit: authStore.transformedPermissions.includes(3),
      showRemove: authStore.transformedPermissions.includes(4),
    }),
    [],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Пользователи"
        withButton={authStore.transformedPermissions.includes(2)}
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={usersStore.isLoading}
        withCellRenderer={
          authStore.transformedPermissions.includes(3) ||
          authStore.transformedPermissions.includes(4)
        }
        cellRendererProps={cellRendererProps}
        rowData={usersData}
        columns={getTableColumns}
      />
    </InnerLayout>
  );
});

export default memo(MainUser);
