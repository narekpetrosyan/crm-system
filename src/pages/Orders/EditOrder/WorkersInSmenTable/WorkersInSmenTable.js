import React, { memo, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { cellDefaultStyles, inSmenColumns } from './constants';
import { useTableCalculator } from './hooks/use-table-calculator';
import { useStore } from '../../../../hooks/useStore';
import { FooterTable } from './components/Footer-table/Footer-table';
import WorkersService from '../../../../http/workers-service/workers-service';
import { getFormData } from '../../../../utils/helpers/getFormData';

const WorkersInSmenTable = observer(({ orderId }) => {
  const hookForm = useForm();
  const { control, getValues, setValue } = hookForm;
  const { ordersStore } = useStore();

  const watchedData = useWatch({ control });

  useEffect(() => {
    ordersStore.getAttachedWorkers(orderId);
  }, []);

  useEffect(() => {
    ordersStore.orderWorkers.forEach((el) => {
      for (let objItem in el) {
        if (objItem.includes('_') && objItem !== 'bank_name') {
          setValue(`${el.id}_${objItem}`, el[objItem]);
        }
      }
    });
  }, [ordersStore.orderWorkers]);

  const { wHours, wPriceStepOne, wPriceStepTwo, wPrice, price } = useTableCalculator({
    watchedData,
  });

  const handleRemoveFromInSmen = async (data) => {
    await WorkersService.removeOrderWorker({
      workerId: data.worker_id,
      orderId: data.order_id,
    }).then(() => ordersStore.filterOrderWorkers(data.worker_id));
  };

  const saveAction = (data) => {
    ordersStore
      .updateOrderWorkers({
        id: data.id,
        values: getFormData(getValues())[data.id],
      })
      .then(() => {
        ordersStore.getAttachedWorkers(orderId);
      });
  };

  const columns = useMemo(
    () =>
      inSmenColumns({
        control,
        removeAction: handleRemoveFromInSmen,
        saveAction,
      }),
    [ordersStore.orderWorkers],
  );

  const pinnedBottomRowData = useMemo(() => {
    return {
      fullName: 'Итого',
      c: '',
      d: '',
      e: '',
      working_hours: wHours,
      w_price_step_one: wPriceStepOne,
      f: '',
      w_price_step_two: wPriceStepTwo,
      g: '',
      w_price: wPrice,
      c_price: price,
      h: '',
      i: '',
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
          rowData={ordersStore.orderWorkers}
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
