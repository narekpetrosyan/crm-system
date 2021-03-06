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
      showEdit: authStore.transformedPermissions.includes('edit.workers'),
      showRemove: authStore.transformedPermissions.includes('delete.workers'),
      withThirdButton: authStore.transformedPermissions.includes('softdelete.workers'),
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
        withButton={authStore.transformedPermissions.includes('create.workers')}
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
          authStore.transformedPermissions.includes('edit.workers') ||
          authStore.transformedPermissions.includes('delete.workers') ||
          authStore.transformedPermissions.includes('softdelete.workers')
        }
      />
    </InnerLayout>
  );
});

export default MainWorkers;
