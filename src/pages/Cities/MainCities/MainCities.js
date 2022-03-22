import React, { useEffect, memo, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import Table from '@components/Table/Table';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { getTableColumns } from './helpers/getTableColumns';

const MainCities = observer(() => {
  const { citiesStore, authStore } = useStore();

  useEffect(() => {
    citiesStore.fetchCities();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/cities/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/cities/edit/${id}`),
      removeAction: (id) => citiesStore.removeCity(id),
      showEdit: authStore.transformedPermissions.includes(20),
      showRemove: authStore.transformedPermissions.includes(21),
    }),
    [],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Города"
        withButton={authStore.transformedPermissions.includes(19)}
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={citiesStore.isLoading}
        cellRendererProps={cellRendererProps}
        columns={getTableColumns}
        withCellRenderer={
          authStore.transformedPermissions.includes(20) ||
          authStore.transformedPermissions.includes(21)
        }
        rowData={citiesStore.cities}
      />
    </InnerLayout>
  );
});

export default memo(MainCities);
