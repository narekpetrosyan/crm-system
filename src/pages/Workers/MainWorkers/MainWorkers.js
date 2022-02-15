import React, { useCallback, useEffect, useMemo } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import clsx from 'clsx';
import { useStore } from '@hooks/useStore';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';
import PageHeading from '@components/PageHeading/PageHeading';
import Loader from '@components/Loader/Loader';
import { history } from '@utils/history/history';

import styles from './MainWorkers.module.scss';

const MainWorkers = observer(() => {
  const { workersStore } = useStore();

  useEffect(() => {
    workersStore.fetchWorkers();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/workers/create'), []);
  const pushHistory = useCallback((id) => history.push(`/workers/edit/${id}`), []);
  const removeWorker = useCallback((id) => console.log(id), []);
  const setOnRemove = useCallback((id) => workersStore.setOnRemove(id), []);
  const recoverWorker = useCallback((id) => workersStore.setOnRemove(id, true), []);

  const workersData = useMemo(
    () =>
      workersStore.workers.map((item) => ({
        ...item,
        deleted_at: item.deleted_at ? moment(item.deleted_at).format('DD-MM-YYYY HH:MM') : '',
      })),
    [workersStore.workers],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Работники"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <div className={clsx(styles.WorkersInnerBody, 'ag-theme-alpine')}>
        {!workersStore.isLoading ? (
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              flex: 1,
              sortable: true,
              suppressMovable: true,
              resizable: true,
            }}
            rowData={workersData}
          >
            <AgGridColumn field="id" headerName="ID" hide />
            <AgGridColumn field="fullName" headerName="ФИО" />
            <AgGridColumn field="phone" headerName="Тел. 1" />
            <AgGridColumn field="phone_dop" headerName="Тел. 2" />
            <AgGridColumn field="workers_cnt" headerName="Отработал смен" maxWidth={80} />
            <AgGridColumn field="status" headerName="Статус" />
            <AgGridColumn field="city" headerName="Город" />
            <AgGridColumn field="comment" headerName="Комментарий" />
            <AgGridColumn field="deleted_at" headerName="На удаление" />
            <AgGridColumn
              field="actions"
              headerName=""
              cellRenderer={({ data }) => (
                <AgActionButtons
                  data={data}
                  editAction={pushHistory}
                  removeAction={removeWorker}
                  withThirdButton
                  thirdIconName={!data.deleted_at ? 'delete' : 'check'}
                  thirdAction={!data.deleted_at ? setOnRemove : recoverWorker}
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

export default MainWorkers;
