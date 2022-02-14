import React, { useCallback, useEffect, useMemo } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';
import Loader from '@components/Loader/Loader';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';

import styles from './MainUser.module.scss';

export const MainUser = observer(() => {
  const { usersStore } = useStore();

  useEffect(() => {
    usersStore.fetchUsers();
  }, []);

  const usersData = useMemo(
    () =>
      usersStore.users?.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        city: item.city,
        is_admin: item.is_admin ? 'Да' : 'Нет',
      })),
    [usersStore.users],
  );

  const headingButtonAction = useCallback(() => history.push('/users/create'), []);
  const pushHistory = useCallback((id) => history.push(`/users/edit/${id}`), []);
  const removeUser = useCallback((id) => usersStore.removeUser(id), []);

  return (
    <InnerLayout>
      <PageHeading
        title="Пользователи"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <div className={clsx(styles.UsersInnerBody, 'ag-theme-alpine')}>
        {!usersStore.isLoading ? (
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              flex: 1,
              sortable: true,
              suppressMovable: true,
            }}
            rowData={usersData}
          >
            <AgGridColumn field="id" headerName="ID" hide />
            <AgGridColumn field="name" headerName="ФИО" />
            <AgGridColumn field="email" headerName="Email" />
            <AgGridColumn field="city" headerName="Город" />
            <AgGridColumn field="is_admin" headerName="Администратор" />
            <AgGridColumn
              field="actions"
              headerName=""
              cellRenderer={({ data }) => (
                <AgActionButtons data={data} editAction={pushHistory} removeAction={removeUser} />
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
