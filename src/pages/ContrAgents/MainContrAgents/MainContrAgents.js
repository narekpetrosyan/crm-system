import React, { memo, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Table from '@components/Table/Table';
import FilterBlock from '@components/FilterBlock/FilterBlock';
import PageHeading from '@components/PageHeading/PageHeading';
import { history } from '@utils/history/history';
import { statusSelectData } from '@utils/helpers/staticSeletcData';
import { useStore } from '@hooks/useStore';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';
import { useObserve } from '../../../hooks/useObserve';

const MainContrAgents = observer(() => {
  const { contrAgentsStore, authStore } = useStore();
  useObserve();

  const headingButtonAction = useCallback(() => history.push('/contr-agents/create'), []);
  const searchFilter = useCallback((data) => contrAgentsStore.searchFilter(data), []);
  const resetFilter = useCallback(() => contrAgentsStore.fetchContrAgents(), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/contr-agents/edit/${id}`),
      removeAction: (id) => contrAgentsStore.removeContrAgent(id),
      showEdit: authStore.transformedPermissions.includes('edit.contragents'),
      showRemove: authStore.transformedPermissions.includes('delete.contragents'),
      withThirdButton: authStore.transformedPermissions.includes('softdelete.contragents'),
      setOnRemoveAction: (id) => contrAgentsStore.setOnRemove(id),
      recoverAction: (id) => contrAgentsStore.setOnRemove(id, true),
    }),
    [],
  );

  const contrAgentsData = useMemo(
    () => convertTableData(contrAgentsStore.contrAgents),
    [contrAgentsStore.contrAgents],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Контрагенты"
        withButton={authStore.transformedPermissions.includes('create.contragents')}
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <FilterBlock
        selectOptions={statusSelectData}
        submitAction={searchFilter}
        resetAction={resetFilter}
        searchLabel="Поиск по названию или ИНН"
        selectLabel="Статус"
      />

      <Table
        isLoading={contrAgentsStore.isLoading}
        rowData={contrAgentsData}
        cellRendererProps={cellRendererProps}
        columns={getTableColumns}
        withCellRenderer={
          authStore.transformedPermissions.includes('delete.contragents') ||
          authStore.transformedPermissions.includes('edit.contragents')
        }
      />
    </InnerLayout>
  );
});

export default memo(MainContrAgents);
