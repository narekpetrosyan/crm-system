import React, { memo } from 'react';

import styles from './SelectField.module.scss';

export const SelectField = memo(({ defaultValue, options = [] }) => {
  return (
    <div className={styles.selectorWrapper}>
      <select className={styles.selector} defaultValue={defaultValue}>
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
    </div>
  );
});
