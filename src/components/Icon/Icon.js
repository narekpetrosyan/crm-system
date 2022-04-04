import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './Icon.module.scss';

export const Icon = ({ name, size = 1, iconVariant, className, ...rest }) => {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      const def = await import(`./icons/${name}.svg`);
      ImportedIconRef.current = def.default;
      setLoading(false);
    };
    importIcon();
    return () => setLoading(false);
  }, [name]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return (
      <span style={{ '--icon-size': size }} className={clsx(styles.Icon, className)}>
        <span>
          <img
            className={iconVariant ? styles[`IconColored${iconVariant}`] : ''}
            src={ImportedIcon}
            alt="sasa"
            {...rest}
          />
        </span>
      </span>
    );
  }
  return null;
};
