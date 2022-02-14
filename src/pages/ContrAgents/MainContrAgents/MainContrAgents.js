import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import clsx from 'clsx';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import { history } from '@utils/history/history';
import { useStore } from '@hooks/useStore';
import Loader from '@components/Loader/Loader';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';

import styles from './MainContrAgents.module.scss';

const MainContrAgents = observer(() => {
  const { contrAgentsStore } = useStore();

  useEffect(() => {
    contrAgentsStore.fetchContrAgents();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/contr-agents/create'), []);
  const pushHistory = useCallback((id) => history.push(`/contr-agents/edit/${id}`), []);
  const removeContrAgent = useCallback((id) => contrAgentsStore.removeContrAgent(id), []);
  const recoverContrAgent = useCallback((id) => contrAgentsStore.setOnRemove(id, true), []);
  const setOnRemove = useCallback((id) => contrAgentsStore.setOnRemove(id), []);

  const contrAgentsData = useMemo(
    () =>
      contrAgentsStore.contrAgents?.map((item) => ({
        ...item,
        deleted_at: item.deleted_at ? moment(item.deleted_at).format('DD-MM-YYYY HH:MM') : '',
      })),
    [contrAgentsStore.contrAgents],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Контрагенты"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />
      <div className={clsx(styles.ContrAgentsInnerBody, 'ag-theme-alpine')}>
        {!contrAgentsStore.isLoading ? (
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              flex: 1,
              sortable: true,
              suppressMovable: true,
              cellStyle: { fontSize: '12px', fontWeight: '600' },
            }}
            rowData={contrAgentsData}
          >
            <AgGridColumn field="id" headerName="ID" hide />
            <AgGridColumn field="name" headerName="Контрагент" />
            <AgGridColumn field="INN" headerName="ИНН" maxWidth={140} />
            <AgGridColumn field="city" headerName="Город" maxWidth={140} />
            <AgGridColumn field="count_objects" headerName="Обьектов" maxWidth={100} />
            <AgGridColumn field="status" headerName="Статус" maxWidth={140} />
            <AgGridColumn field="deleted_at" headerName="На удаление" maxWidth={150} />
            <AgGridColumn
              field="actions"
              headerName=""
              cellRenderer={({ data }) => (
                <AgActionButtons
                  data={data}
                  editAction={pushHistory}
                  removeAction={removeContrAgent}
                  withThirdButton
                  thirdIconName={!data.deleted_at ? 'delete' : 'check'}
                  thirdAction={!data.deleted_at ? setOnRemove : recoverContrAgent}
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

export default memo(MainContrAgents);
