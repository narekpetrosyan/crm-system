import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@components/Table/Table';
import { useStore } from '@hooks/useStore';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import PageHeading from '@components/PageHeading/PageHeading';
import { history } from '@utils/history/history';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';

const MainWorkers = observer(() => {
  const { workersStore } = useStore();

  useEffect(() => {
    if (!workersStore.workers.length) {
      workersStore.fetchWorkers();
    }
  }, []);

  const headingButtonAction = useCallback(() => history.push('/workers/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/workers/edit/${id}`),
      removeAction: (id) => console.log(id),
      withThirdButton: true,
      setOnRemoveAction: (id) => workersStore.setOnRemove(id),
      recoverAction: (id) => workersStore.setOnRemove(id, true),
    }),
    [],
  );

  const workersData = useMemo(() => convertTableData(workersStore.workers), [workersStore.workers]);

  return (
    <InnerLayout>
      <PageHeading
        title="Работники"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={workersStore.isLoading}
        cellRendererProps={cellRendererProps}
        rowData={workersData}
        columns={getTableColumns}
      />
    </InnerLayout>
  );
});

export default MainWorkers;
