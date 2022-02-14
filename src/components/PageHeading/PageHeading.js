import React from 'react';
import { Button, Typography } from '@mui/material';
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
      <Typography variant="h3">{title}</Typography>
      {withButton && (
        <div>
          {insertButton && (
            <Button onClick={insertButtonAction}>
              <Icon name={insertButtonIconName} size={0.6} />
              <span className={styles.ButtonSpan}>{insertButtonTitle}</span>
            </Button>
          )}
          <Button onClick={buttonAction}>
            <Icon name={iconName} size={0.6} />
            <span className={styles.ButtonSpan}>{buttonTitle}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageHeading;
