import React, { useCallback, useEffect, useMemo, memo } from 'react';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import { history } from '@utils/history/history';
import { useStore } from '@hooks/useStore';
import Table from '@components/Table/Table';
import { getTableColumns } from '../MainCalls/helpers/getTableColumns';
import { convertTableData } from '../MainCalls/helpers/convertTableData';

const PlannedCalls = () => {
  const { callsStore } = useStore();

  useEffect(() => {
    if (!callsStore.plannedCalls.length) {
      callsStore.fetchPlannedCalls();
    }
  }, []);

  const headingButtonAction = useCallback(() => history.push('/calls'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => console.log(id),
      removeAction: (id) => console.log(id),
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
};

export default memo(PlannedCalls);
