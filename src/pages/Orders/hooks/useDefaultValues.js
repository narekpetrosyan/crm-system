import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useStore } from '../../../hooks/useStore';
import { transformForSelect } from '../../../utils/helpers/transformForSelect';

export const useDefaultValues = (contrAgents, caObjects, caOContactList) => {
  const {
    ordersStore: { order },
  } = useStore();
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(
      'contragent_id',
      contrAgents?.find((el) => el.value === Number(order?.contragent?.id)),
    );
  }, [contrAgents]);

  useEffect(() => {
    setValue(
      'object_id',
      caObjects?.find((el) => el.value === Number(order?.ob?.id)),
    );
  }, [caObjects]);

  useEffect(() => {
    setValue(
      'contact_id',
      caOContactList?.find((el) => el.value === Number(order?.contact?.id)),
    );
  }, [caOContactList]);

  useEffect(() => {
    if (order) {
      setValue('start_time', order?.start_time);
      setValue('end_time', order?.end_time);
      setValue(
        'user_id',
        transformForSelect(order?.users, 'id', 'name').find(
          (el) => el.value === Number(order.user_id),
        ),
      );
    }
  }, [caOContactList]);
};
