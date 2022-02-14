import React, { useCallback, useEffect, memo, useMemo } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { useStore } from '@hooks/useStore';
import PageHeading from '@components/PageHeading/PageHeading';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';
import { history } from '@utils/history/history';
import Loader from '@components/Loader/Loader';

import styles from './MainCalls.module.scss';

const MainCalls = observer(() => {
  const { callsStore } = useStore();

  useEffect(() => {
    callsStore.fetchCalls();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/calls/create'), []);
  const headingInsertedButtonAction = useCallback(() => history.push('/calls/planned'), []);
  const pushHistory = useCallback((id) => history.push(`/calls/edit/${id}`), []);
  const removeCall = useCallback((id) => console.log(id), []);

  const callsData = useMemo(
    () =>
      callsStore.calls?.map((item) => ({
        id: item.id,
        contragent: item.contragent?.name,
        contact: item.contact?.name,
        time: item.time,
        is_finished: item.is_finished === 1 ? '+' : '-',
      })),
    [callsStore.calls],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Звонки"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
        insertButton
        insertButtonIconName="folder"
        insertButtonTitle="Запланированные"
        insertButtonAction={headingInsertedButtonAction}
      />
      <div className={clsx(styles.CallsInnerBody, 'ag-theme-alpine')}>
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
                <AgActionButtons data={data} editAction={pushHistory} removeAction={removeCall} />
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

export default memo(MainCalls);
