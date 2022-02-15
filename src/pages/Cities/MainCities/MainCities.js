import React, { useEffect, memo, useCallback } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { history } from '@utils/history/history';
import PageHeading from '@components/PageHeading/PageHeading';
import AgActionButtons from '@components/AgActionButtons/AgActionButtons';
import Loader from '@components/Loader/Loader';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';

import styles from './MainCities.module.scss';

const MainCities = observer(() => {
  const { citiesStore } = useStore();

  useEffect(() => {
    citiesStore.fetchCities();
  }, []);

  const headingButtonAction = useCallback(() => history.push('/cities/create'), []);
  const pushHistory = useCallback((id) => history.push(`/cities/edit/${id}`), []);
  const removeCity = useCallback((id) => citiesStore.removeCity(id), []);

  return (
    <InnerLayout>
      <PageHeading
        title="Города"
        withButton
        buttonTitle="Добавить"
        iconName="edit"
        buttonAction={headingButtonAction}
      />

      <div className={clsx(styles.CitiesInnerBody, 'ag-theme-alpine')}>
        {!citiesStore.isLoading ? (
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              flex: 1,
              sortable: true,
              suppressMovable: true,
            }}
            rowData={citiesStore.cities}
          >
            <AgGridColumn field="id" headerName="ID" hide />
            <AgGridColumn field="name" headerName="Название" />
            <AgGridColumn
              field="actions"
              headerName=""
              cellRenderer={({ data }) => (
                <AgActionButtons data={data} editAction={pushHistory} removeAction={removeCity} />
              )}
            />
          </AgGridReact>
        ) : (
          <Loader />
        )}
      </div>
    </InnerLayout>
  );
});

export default memo(MainCities);
