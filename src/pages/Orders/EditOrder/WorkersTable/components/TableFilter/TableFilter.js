import React, { memo, useMemo, useState } from 'react';
import clsx from 'clsx';

import styles from './TableFilter.module.scss';

export const TableFilter = memo(({ clickHandler }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  const clickTab = (e) => {
    setActiveTab(e.target.value);
    clickHandler(e.target.value);
  };

  const filterBtns = useMemo(
    () => [
      { value: 'ALL', label: 'Все' },
      { value: 'WORKING', label: 'В смене' },
      { value: 'RESERVED', label: 'В резерве' },
      { value: 'UNAVAILABLE', label: 'Недоступные' },
    ],
    [],
  );

  return (
    <div className={styles.tableFilterWrapper}>
      <ul className={styles.tableFilterBtns}>
        {filterBtns.map((el) => (
          <li className={activeTab === el.value ? styles.active : ''} key={el.value}>
            <button
              className={clsx(styles.tableFilterBtn)}
              value={el.value}
              onClick={(e) => clickTab(e)}
            >
              {el.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
