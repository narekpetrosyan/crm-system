import React, { memo } from 'react';

export const FooterTable = memo(({ rowData }) => {
  return (
    <table
      style={{
        width: '100%',
        border: '1px solid #757575',
      }}
    >
      <tr
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {Object.values(rowData).map((el, index) => {
          return (
            <td
              key={index}
              style={{
                padding: '0 10px',
                fontSize: 12,
                fontWeight: '600',
                textAlign: 'center',
                margin: '0 auto',
              }}
            >
              {el}
            </td>
          );
        })}
      </tr>
    </table>
  );
});
