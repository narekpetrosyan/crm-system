import React, { memo, useMemo } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { cellDefaultStyles, inSmenColumns } from './constants';
import { useTableCalculator } from './hooks/use-table-calculator';
import { useStore } from '../../../../hooks/useStore';
import { FooterTable } from './components/Footer-table/Footer-table';

const WorkersInSmenTable = observer(() => {
  const hookForm = useForm();
  const { control } = hookForm;
  const { workersStore } = useStore();

  const watchedData = useWatch({ control });

  const { wHours, wPriceStepOne, wPriceStepTwo, wPrice, price } = useTableCalculator({
    watchedData,
  });

  const columns = inSmenColumns(control);

  const pinnedBottomRowData = useMemo(() => {
    return {
      fullName: 'Итого',
      c: '',
      d: '',
      e: '',
      workers_cnt: wHours,
      w_price_step_one: wPriceStepOne,
      f: '',
      w_price_step_two: wPriceStepTwo,
      g: '',
      w_price: wPrice,
      price: price,
    };
  }, [wHours, wPriceStepOne, wPriceStepTwo, wPrice, price]);

  return (
    <FormProvider {...hookForm}>
      <div
        className="ag-theme-alpine"
        style={{
          height: '220px',
          overflowY: 'auto',
          marginBottom: 30,
        }}
      >
        <AgGridReact
          rowHeight={40}
          rowSelection="single"
          defaultColDef={{
            cellStyle: { ...cellDefaultStyles },
            flex: 1,
            sortable: true,
            suppressMovable: true,
            resizable: true,
            autoHeight: true,
          }}
          rowData={workersStore.orderWorkersInSmen}
        >
          {columns.map((colItem) => (
            <AgGridColumn
              key={colItem.headerName}
              field={colItem.field}
              headerName={colItem.headerName}
              hide={colItem.hide}
              maxWidth={colItem.maxWidth}
              cellRenderer={colItem.cellRenderer}
            />
          ))}
        </AgGridReact>
        <FooterTable rowData={pinnedBottomRowData} />
      </div>
    </FormProvider>
  );
});

export default memo(WorkersInSmenTable);
