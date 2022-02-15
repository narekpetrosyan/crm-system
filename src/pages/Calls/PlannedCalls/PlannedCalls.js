import React, { useCallback, useEffect, useMemo } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import clsx from 'clsx';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';
import { history } from '@utils/history/history';
import { useStore } from '@hooks/useStore';
import Loader from '@components/Loader/Loader';

import styles from './PlannedCalls.module.scss';

const PlannedCalls = () => {
  const { callsStore } = useStore();

  useEffect(() => {
    callsStore.fetchPlannedCalls();
  }, []);

  const callsData = useMemo(
    () =>
      callsStore.plannedCalls?.map((item) => ({
        id: item.id,
        contragent: item.contragent?.name,
        contact: item.contact?.name,
        time: item.time,
        is_finished: item.is_finished === 1 ? '+' : '-',
      })),
    [callsStore.plannedCalls],
  );

  const headingButtonAction = useCallback(() => history.push('/calls'), []);
  const pushHistory = useCallback((id) => console.log(id), []);
  const removePlannedCall = useCallback((id) => console.log(id), []);

  return (
    <InnerLayout>
      <PageHeading
        title="Звонки"
        withButton
        buttonTitle="Вернуться к списку"
        iconName="refresh"
        buttonAction={headingButtonAction}
      />
      <div className={clsx(styles.PlannedCallsInnerBody, 'ag-theme-alpine')}>
        {!callsStore.isLoading ? (
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              flex: 1,
              sortable: true,
              suppressMovable: true,
              cellStyle: { fontSize: '12px', fontWeight: '600' },
            }}
            rowData={callsData}
          >
            <AgGridColumn field="id" headerName="ID" hide />
            <AgGridColumn field="contragent" headerName="Контрагент" />
            <AgGridColumn field="contact" headerName="Контакт" />
            <AgGridColumn field="time" headerName="Время" maxWidth={140} />
            <AgGridColumn field="is_finished" headerName="Выполнен" maxWidth={100} />
            <AgGridColumn
              field="actions"
              headerName=""
              cellRenderer={({ data }) => (
                <AgActionButtons
                  data={data}
                  editAction={pushHistory}
                  removeAction={removePlannedCall}
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
};

export default PlannedCalls;
