import React, { useCallback, useEffect, useMemo, memo } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@components/Table/Table';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import { history } from '@utils/history/history';
import { useStore } from '@hooks/useStore';
import { getTableColumns } from '../MainCalls/helpers/getTableColumns';
import { convertTableData } from '../MainCalls/helpers/convertTableData';

const PlannedCalls = observer(() => {
  const { callsStore } = useStore();

  useEffect(() => {
    callsStore.fetchPlannedCalls();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/calls'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/calls/edit/${id}`),
      removeAction: (id) => callsStore.removeCall(id),
    }),
    [],
  );

  const callsData = useMemo(
    () => convertTableData(callsStore.plannedCalls),
    [callsStore.plannedCalls],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Звонки"
        withButton
        buttonTitle="Вернуться к списку"
        iconName="refresh"
        buttonAction={headingButtonAction}
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

export default memo(PlannedCalls);
