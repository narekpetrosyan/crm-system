import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Loader from '@components/Loader/Loader';
import Heading from '@components/Heading/Heading';
import { Button } from '@components/Button/Button';
import AnalyticsFilter from '@components/AnalyticsFilter/AnalyticsFilter';
import { useStore } from '@hooks/useStore';
import { useAnalyticsOptions } from '@hooks/useAnalyticsOptions';
import { history } from '@utils/history/history';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';

import styles from './MainAnalytics.module.scss';

const MainAnalytics = observer(() => {
  const { analyticsStore } = useStore();
  const { contrAgents, isLoading } = useAnalyticsOptions();
  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      contragent_id: '',
      dt_start: '',
      dt_end: '',
      finished: false,
    },
  });

  const watchWorkers = form.watch('workers');
  const watchOrders = form.watch('orders');

  const cellDefaultStyles = useMemo(() => ({ fontSize: '12px', fontWeight: '600' }), []);

  const analyticsData = useMemo(
    () => convertTableData(analyticsStore.analytics),
    [analyticsStore.analytics],
  );

  const getRowStyle = (param) => {
    if (param.data.is_ended) {
      return { background: '#d0e9c6' };
    }
    return { background: '' };
  };

  const analyticPushAction = (id) => {
    history.push(`/orders/edit/${id}`);
  };

  const searchSubmit = (data) => {
    analyticsStore.searchAnalytics(data);
  };

  if (analyticsStore.isLoading || isLoading) return <Loader />;

  const getExpandedRowData = () => {
    if (!analyticsStore.analytics.length) {
      return [];
    }

    let index = 0;

    const arr = [];
    const sArr = [];
    analyticsStore.analytics.forEach((item) => {
      arr[index] = {
        ...analyticsData.find((l) => l.id === item.id),
        ttt: item.workers.map((it) => ({ order_id: it.name })),
      };
      index += item.workers.length;
    });
    arr.forEach((yt) => {
      sArr.push(yt);
      yt.ttt.forEach((u) => {
        sArr.push(u);
      });
    });
    return [...sArr];
  };

  return (
    <InnerLayout>
      <AnalyticsFilter
        selectLabel="Контрагент"
        selectOptions={contrAgents}
        submitAction={searchSubmit}
        form={form}
      />

      <div className={styles.AmountBlock}>
        <Heading variant="h4" className={styles.AmountBlockText}>
          Сумма: {analyticsStore.amount}
        </Heading>
      </div>
      {watchOrders && (
        <div className={clsx(styles.TableWrapper, 'ag-theme-alpine')}>
          <AgGridReact
            rowSelection="single"
            defaultColDef={{
              cellStyle: { ...cellDefaultStyles },
              flex: 1,
              sortable: true,
              suppressMovable: true,
              resizable: true,
            }}
            getRowStyle={(params) => getRowStyle(params)}
            rowData={!watchWorkers ? analyticsData : getExpandedRowData()}
          >
            {getTableColumns.map((colItem) => {
              if (colItem.field !== 'actions') {
                return (
                  <AgGridColumn
                    key={colItem.headerName}
                    field={colItem.field}
                    headerName={colItem.headerName}
                    hide={colItem.hide}
                    maxWidth={colItem.maxWidth}
                  />
                );
              }
              return (
                <AgGridColumn
                  key={colItem.headerName}
                  field={colItem.field}
                  headerName={colItem.headerName}
                  cellRenderer={({ data }) => (
                    <Button
                      color="primary"
                      clickHandler={() => analyticPushAction(data.id)}
                      size={200}
                    >
                      Посмотреть
                    </Button>
                  )}
                />
              );
            })}
          </AgGridReact>
        </div>
      )}
    </InnerLayout>
  );
});

export default memo(MainAnalytics);
