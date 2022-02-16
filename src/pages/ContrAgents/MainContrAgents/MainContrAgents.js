import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@components/Table/Table';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import FilterBlock from '@components/FilterBlock/FilterBlock';
import PageHeading from '@components/PageHeading/PageHeading';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';

const MainContrAgents = observer(() => {
  const { contrAgentsStore } = useStore();

  useEffect(() => {
    contrAgentsStore.fetchContrAgents();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/contr-agents/create'), []);
  const searchFilter = useCallback((data) => contrAgentsStore.searchFilter(data), []);
  const resetFilter = useCallback(() => contrAgentsStore.fetchContrAgents(), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/contr-agents/edit/${id}`),
      removeAction: (id) => contrAgentsStore.removeContrAgent(id),
      withThirdButton: true,
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
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <FilterBlock
        selectOptions={contrAgentsStore.statuses}
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
      />
    </InnerLayout>
  );
});

export default memo(MainContrAgents);
