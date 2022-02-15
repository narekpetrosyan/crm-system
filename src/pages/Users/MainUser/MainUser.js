import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Table from '@components/Table/Table';
import { convertTableData } from './helpers/convertTableData';
import { getTableColumns } from './helpers/getTableColumns';

export const MainUser = observer(() => {
  const { usersStore } = useStore();

  useEffect(() => {
    if (!usersStore.users.length) {
      usersStore.fetchUsers();
    }
  }, []);

  const usersData = useMemo(() => convertTableData(usersStore.users), [usersStore.users]);

  const headingButtonAction = useCallback(() => history.push('/users/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/users/edit/${id}`),
      removeAction: (id) => usersStore.removeUser(id),
    }),
    [],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Пользователи"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={usersStore.isLoading}
        cellRendererProps={cellRendererProps}
        rowData={usersData}
        columns={getTableColumns}
      />
    </InnerLayout>
  );
});
