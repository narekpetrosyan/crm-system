import React, { useEffect, memo, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import Table from '@components/Table/Table';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { getTableColumns } from './helpers/getTableColumns';
import { useObserve } from '../../../hooks/useObserve';

const MainCities = observer(() => {
  const { citiesStore, authStore } = useStore();
  useObserve();

  useEffect(() => {
    citiesStore.fetchCities();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/cities/create'), []);

  const cellRendererProps = useMemo(
    () => ({
      pushAction: (id) => history.push(`/cities/edit/${id}`),
      removeAction: (id) => citiesStore.removeCity(id),
      showEdit: authStore.transformedPermissions.includes('edit.cities'),
      showRemove: authStore.transformedPermissions.includes('delete.cities'),
    }),
    [],
  );

  return (
    <InnerLayout>
      <PageHeading
        title="Города"
        withButton={authStore.transformedPermissions.includes('create.cities')}
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <Table
        isLoading={citiesStore.isLoading}
        cellRendererProps={cellRendererProps}
        columns={getTableColumns}
        withCellRenderer={
          authStore.transformedPermissions.includes('edit.cities') ||
          authStore.transformedPermissions.includes('delete.cities')
        }
        rowData={citiesStore.cities}
      />
    </InnerLayout>
  );
});

export default memo(MainCities);
