import React, { useCallback, memo, useMemo } from 'react';
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
  const todayCallsCount = callsStore?.todayCallsCount;

  const headingButtonAction = useCallback(() => history.push('/calls/create'), []);
  const headingInsertedButtonAction = useCallback(() => history.push('/calls/planned'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/calls/edit/${id}`),
      removeAction: (id) => callsStore.removeCall(id),
      showEdit: true,
      showRemove: true,
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
        insertButtonTitle={
          todayCallsCount !== 0
            ? `Запланированные (сегодня - ${todayCallsCount})`
            : 'Запланированные'
        }
        insertButtonAction={headingInsertedButtonAction}
      />

      <Table
        isLoading={callsStore.isLoading}
        rowData={callsData}
        columns={getTableColumns}
        cellRendererProps={cellRendererProps}
        withCellRenderer
      />
    </InnerLayout>
  );
});

export default memo(MainCalls);
