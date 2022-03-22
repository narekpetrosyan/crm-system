import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import Table from '@components/Table/Table';
import PageHeading from '@components/PageHeading/PageHeading';
import FilterBlock from '@components/FilterBlock/FilterBlock';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { history } from '@utils/history/history';
import { statusSelectData } from '@utils/helpers/staticSeletcData';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';

const MainWorkers = observer(() => {
  const { workersStore, authStore } = useStore();

  useEffect(() => {
    workersStore.fetchWorkers();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/workers/create'), []);
  const searchFilter = useCallback((data) => workersStore.searchFilter(data), []);
  const resetFilter = useCallback(() => workersStore.fetchWorkers(), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/workers/edit/${id}`),
      removeAction: (id) => workersStore.removeWorker(id),
      showEdit: authStore.transformedPermissions.includes(11),
      showRemove: authStore.transformedPermissions.includes(12),
      withThirdButton: authStore.transformedPermissions.includes(23),
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
        withButton={authStore.transformedPermissions.includes(10)}
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <FilterBlock
        selectOptions={statusSelectData}
        submitAction={searchFilter}
        resetAction={resetFilter}
        searchLabel="Поиск по ФИО или номеру телефона"
        selectLabel="Статус"
      />

      <Table
        isLoading={workersStore.isLoading}
        cellRendererProps={cellRendererProps}
        rowData={workersData}
        columns={getTableColumns}
        withCellRenderer={
          authStore.transformedPermissions.includes(11) ||
          authStore.transformedPermissions.includes(12) ||
          authStore.transformedPermissions.includes(23)
        }
      />
    </InnerLayout>
  );
});

export default MainWorkers;
