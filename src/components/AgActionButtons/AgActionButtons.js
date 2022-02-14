import React, { memo } from 'react';
import { Button } from '@mui/material';
import { Icon } from '../Icon/Icon';

const AgActionButtons = ({
  data,
  editAction,
  removeAction,
  withThirdButton = false,
  thirdAction,
  thirdIconName = 'delete',
}) => {
  return (
    <>
      {withThirdButton && (
        <Button onClick={() => thirdAction(data.id)} size="small">
          <Icon name={thirdIconName} size={0.6} />
        </Button>
      )}
      <Button onClick={() => editAction(data.id)} size="small">
        <Icon name="edit" size={0.6} />
      </Button>
      <Button onClick={() => removeAction(data.id)} size="small">
        <Icon name="trash" size={0.6} />
      </Button>
    </>
  );
};

export default memo(AgActionButtons);
