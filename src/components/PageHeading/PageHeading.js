import React, { memo } from 'react';
import { Button } from '@components/Button/Button';
import Heading from '../Heading/Heading';
import { Icon } from '../Icon/Icon';

import styles from './PageHeading.module.scss';

const PageHeading = ({
  title,
  withButton = false,
  buttonAction,
  iconName,
  buttonTitle,
  insertButton = false,
  insertButtonAction,
  insertButtonIconName,
  insertButtonTitle,
}) => {
  return (
    <div className={styles.HeaderWrapper}>
      <Heading variant="h3">{title}</Heading>
      {withButton && (
        <div className={styles.ButtonContainer}>
          {insertButton && (
            <Button clickHandler={insertButtonAction}>
              <Icon name={insertButtonIconName} size={0.6} />
              <span className={styles.ButtonSpan}>{insertButtonTitle}</span>
            </Button>
          )}
          <Button clickHandler={buttonAction}>
            <Icon name={iconName} size={0.6} />
            <span className={styles.ButtonSpan}>{buttonTitle}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(PageHeading);
