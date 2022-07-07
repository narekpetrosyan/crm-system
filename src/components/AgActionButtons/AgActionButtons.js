import React, { memo } from 'react';
import { Button } from '@components/Button/Button';
import { Icon } from '../Icon/Icon';

import styles from './AgActionButtons.module.scss';

const AgActionButtons = ({
  data,
  editAction,
  removeAction,
  saveAction,
  withThirdButton = false,
  showEdit = false,
  showRemove = false,
  showSave = false,
  thirdAction,
  thirdIconName = 'delete',
}) => {
  return (
    <div className={styles.AgActionButtonsWrapper}>
      {withThirdButton && (
        <Button clickHandler={() => thirdAction(data.id)} size={25}>
          <Icon name={thirdIconName} size={0.6} />
        </Button>
      )}
      {showEdit && (
        <Button clickHandler={() => editAction(data.id)} size={25}>
          <Icon name="edit" size={0.6} />
        </Button>
      )}
      {showRemove && (
        <Button clickHandler={() => removeAction(data.id)} size={25}>
          <Icon name="trash" size={0.6} />
        </Button>
      )}
      {showSave && (
        <Button clickHandler={() => saveAction(data.id)} size={25}>
          <Icon name="check" size={0.6} />
        </Button>
      )}
    </div>
  );
};

export default memo(AgActionButtons);
