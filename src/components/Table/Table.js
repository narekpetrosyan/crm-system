import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Loader from '../Loader/Loader';
import AgActionButtons from '../AgActionButtons/AgActionButtons';

import styles from './Table.module.scss';

const Table = ({
  rowData,
  isLoading = false,
  columns = [],
  getRowStyle = () => {},
  cellStyle = {},
  colDef = {
    flex: 1,
    sortable: true,
    suppressMovable: true,
    resizable: true,
  },
  cellRendererProps = {},
  withCellRenderer = true,
}) => {
  const cellDefaultStyles = useMemo(() => ({ fontSize: '12px', fontWeight: '600' }), []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={clsx(styles.TableWrapper, 'ag-theme-alpine')}>
      <AgGridReact
        rowSelection="single"
        defaultColDef={{
          cellStyle: { ...cellDefaultStyles, cellStyle },
          ...colDef,
        }}
        getRowStyle={getRowStyle}
        rowData={rowData}
      >
        {columns.map((colItem) => (
          <AgGridColumn
            key={colItem.headerName}
            field={colItem.field}
            headerName={colItem.headerName}
            hide={colItem.hide}
            maxWidth={colItem.maxWidth}
          />
        ))}
        {withCellRenderer && (
          <AgGridColumn
            field="actions"
            headerName=""
            cellRenderer={({ data }) =>
              cellRendererProps.withThirdButton ? (
                <AgActionButtons
                  data={data}
                  editAction={cellRendererProps.pushAction}
                  removeAction={cellRendererProps.removeAction}
                  withThirdButton={cellRendererProps.withThirdButton}
                  thirdIconName={!data.deleted_at ? 'delete' : 'check'}
                  thirdAction={
                    !data.deleted_at
                      ? cellRendererProps.setOnRemoveAction
                      : cellRendererProps.recoverAction
                  }
                />
              ) : (
                <AgActionButtons
                  data={data}
                  editAction={cellRendererProps.pushAction}
                  removeAction={cellRendererProps.removeAction}
                  withThirdButton={false}
                />
              )
            }
          />
        )}
      </AgGridReact>
    </div>
  );
};

export default memo(Table);
