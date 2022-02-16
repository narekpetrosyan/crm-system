import React, { memo, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import Table from '@components/Table/Table';
import Heading from '@components/Heading/Heading';
import AnalyticsFilter from '@components/AnalyticsFilter/AnalyticsFilter';
import { getTableColumns } from './helpers/getTableColumns';
import { convertTableData } from './helpers/convertTableData';

import styles from './MainAnalytics.module.scss';

const MainAnalytics = observer(() => {
  const { contrAgentsStore, analyticsStore } = useStore();
  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      contragent_id: '',
      dt_start: '',
      dt_end: '',
      finished: false,
    },
  });

  useEffect(() => {
    if (!contrAgentsStore.contrAgents.length) {
      contrAgentsStore.fetchContrAgents();
    }
  }, []);

  const analyticsData = useMemo(
    () => convertTableData(analyticsStore.analytics),
    [analyticsStore.analytics],
  );

  return (
    <InnerLayout>
      <AnalyticsFilter
        selectLabel="Контрагент"
        selectOptions={contrAgentsStore.contrAgents}
        submitAction={(data) => console.log(data)}
        form={form}
      />

      <div className={styles.AmountBlock}>
        <Heading variant="h4" className={styles.AmountBlockText}>
          Сумма: {analyticsStore.amount}
        </Heading>
      </div>

      {form.watch('orders') && (
        <Table
          isLoading={analyticsStore.isLoading}
          rowData={analyticsData}
          columns={getTableColumns}
        />
      )}
    </InnerLayout>
  );
});

export default memo(MainAnalytics);
