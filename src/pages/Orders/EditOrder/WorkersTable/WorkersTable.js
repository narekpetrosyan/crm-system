import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import Loader from '../../../../components/Loader/Loader';
import { Button } from '../../../../components/Button/Button';
import { SelectField } from './components/SelectField/SelectField';
import { statusSelectData } from '../../../../utils/helpers/staticSeletcData';
import { TableFilter } from './components/TableFilter/TableFilter';
import WorkersInSmenTable from '../WorkersInSmenTable/WorkersInSmenTable';

import styles from './WorkersTable.module.scss';

export const WorkersTable = observer(
  ({ rowData, isLoading, filterHandler, selectButtonHandler, showWorkingTable = false }) => {
    const cellDefaultStyles = useMemo(() => ({ fontSize: '12px', fontWeight: '600' }), []);

    const columns = useMemo(
      () => [
        { field: 'id', hide: true, headerName: 'ID' },
        { field: 'fullName', headerName: 'ФИО' },
        { field: 'phone', headerName: 'Телефон' },
        { field: 'workers_cnt', headerName: 'Отработаных смен' },
        { field: 'comment', headerName: 'Комментарий' },
        {
          field: 'status',
          headerName: 'Статус',
          cellRenderer: ({ data }) => (
            <SelectField options={statusSelectData} defaultValue={data.status_en} />
          ),
        },
      ],
      [],
    );

    const handleClickButton = (data) => {
      selectButtonHandler(Number(data.id));
    };

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <TableFilter clickHandler={filterHandler} />
        {rowData.length > 0 && !showWorkingTable && (
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
              rowData={rowData}
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
              <AgGridColumn
                field="actions"
                headerName=""
                cellRenderer={({ data }) => (
                  <Button color="primary" clickHandler={() => handleClickButton(data)} size={150}>
                    Выбрать
                  </Button>
                )}
              />
            </AgGridReact>
          </div>
        )}
        {showWorkingTable && <WorkersInSmenTable />}
      </>
    );
  },
);
