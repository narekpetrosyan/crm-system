import React, { useCallback, useEffect, memo, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { useStore } from '@hooks/useStore';
import PageHeading from '@components/PageHeading/PageHeading';
import { history } from '@utils/history/history';
import Table from '@components/Table/Table';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';

const MainCalls = observer(() => {
  const { callsStore } = useStore();

  useEffect(() => {
    callsStore.fetchCalls();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/calls/create'), []);
  const headingInsertedButtonAction = useCallback(() => history.push('/calls/planned'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/calls/edit/${id}`),
      removeAction: (id) => callsStore.removeCall(id),
    }),
    [],
  );

  const callsData = useMemo(() => convertTableData(callsStore.calls), [callsStore.calls]);

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

      <Table
        isLoading={callsStore.isLoading}
        rowData={callsData}
        columns={getTableColumns}
        cellRendererProps={cellRendererProps}
      />
    </InnerLayout>
  );
});

export default memo(MainCalls);
