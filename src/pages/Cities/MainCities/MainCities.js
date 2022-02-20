import React, { useEffect, memo, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import Table from '@components/Table/Table';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { getTableColumns } from './helpers/getTableColumns';

const MainCities = observer(() => {
  const { citiesStore } = useStore();

  useEffect(() => {
    citiesStore.fetchCities();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/cities/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/cities/edit/${id}`),
      removeAction: (id) => citiesStore.removeCity(id),
      withThirdButton: false,
    }),
    [],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Города"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={citiesStore.isLoading}
        cellRendererProps={cellRendererProps}
        columns={getTableColumns}
        rowData={citiesStore.cities}
      />
    </InnerLayout>
  );
});

export default memo(MainCities);
