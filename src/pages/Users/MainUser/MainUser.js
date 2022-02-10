import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Typography, Button } from '@mui/material';
import { ScaleLoader } from 'react-spinners';
import { useStore } from '../../../hooks/useStore';
import { Icon } from '../../../components/Icon/Icon';

import styles from './MainUser.module.scss';

// eslint-disable-next-line no-unused-vars
const ButtonRend = ({ data }) => {
  const navigate = useNavigate();
  const { usersStore } = useStore();

  return (
    <>
      <Button onClick={() => navigate(`/users/edit/${data.id}`)}>
        <Icon name="edit" size={0.6} />
      </Button>
      <Button onClick={() => usersStore.removeUser(data.id)}>
        <Icon name="trash" size={0.6} />
      </Button>
    </>
  );
};

export const MainUser = observer(() => {
  const { usersStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    usersStore.fetchUsers();
  }, []);

  const usersData = usersStore.users?.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    city: item.city,
    is_admin: item.is_admin ? 'Да' : 'Нет',
  }));

  return (
    <>
      <div className={styles.UsersInnerHeader}>
        <Typography variant="h3">Пользователи</Typography>
        <Button onClick={() => navigate('/users/create')}>
          <Icon name="edit" size={0.6} />
          <span className={styles.ButtonSpan}>Добавить</span>
        </Button>
      </div>

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
            <AgGridColumn field="actions" headerName="" cellRenderer={ButtonRend} />
          </AgGridReact>
        ) : (
          <div className={styles.Loader}>
            <ScaleLoader size={150} color="#1976d2" />
          </div>
        )}
      </div>
    </>
  );
});
