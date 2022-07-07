import React, { useEffect } from 'react';
import styles from '../CreateOrder/CreateOrder.module.scss';
import { SelectInput } from '../../../components/Form/SelectInput/SelectInput';
import { TextInput } from '../../../components/Form/TextInput/TextInput';
import { CheckboxLabel } from '../../../components/Form/CheckboxLabel/CheckboxLabel';
import DateInput from '../../../components/Form/DateInput/DateInput';
import TextAreaInput from '../../../components/Form/TextAreaInput/TextAreaInput';
import { transformForSelect } from '../../../utils/helpers/transformForSelect';
import { useCaValues } from '../hooks/useCaValues';
import { useFormContext } from 'react-hook-form';
import { useDefaultValues } from '../hooks/useDefaultValues';
import { useStore } from '../../../hooks/useStore';

const EditForm = ({ control, order }) => {
  const { workersStore } = useStore();
  const { setValue, watch } = useFormContext();
  const {
    contrAgents,
    contrAgentsLoading,
    caObjectsLoading,
    caObjects,
    caOContactList,
    caOContactListLoading,
    contrAgentsAll,
  } = useCaValues(control, setValue);
  useDefaultValues(contrAgents, caObjects, caOContactList);

  const watchCA = watch?.('contragent_id')?.value;

  useEffect(() => {
    watchCA && workersStore.setSelectedCA(contrAgentsAll.find((el) => el.id === watchCA));
  }, [watchCA]);

  return (
    <div className={styles.CreateOrderForm}>
      <div className={styles.CreateOrderFormBlock}>
        <SelectInput
          name="contragent_id"
          loading={contrAgentsLoading}
          withTopLabel
          label="Контрагент"
          options={contrAgents}
        />
        <SelectInput
          withTopLabel
          label="Объект"
          name="object_id"
          loading={caObjectsLoading}
          options={caObjects}
        />
        <SelectInput
          withTopLabel
          label="Контактное лицо"
          name="contact_id"
          options={caOContactList}
          loading={caOContactListLoading}
        />
        <TextInput control={control} name="phone" withTopLabel label="Телефон" disabled />
        <TextInput
          control={control}
          type="number"
          name="price"
          withTopLabel
          label="Ставка заказчик"
        />
      </div>

      <div className={styles.CreateOrderFormBlock}>
        <TextInput
          control={control}
          type="number"
          name="w_price"
          withTopLabel
          label="Ставка работник"
        />
        <DateInput variant="datetime" name="start_time" label="Начало смены" />
        <DateInput variant="datetime" name="end_time" label="Окончание смены" />
        <CheckboxLabel name="is_payment" label="Оплачено заказчиком" />
        <CheckboxLabel name="is_lunch_included" label="Не учитывать обед" />
      </div>

      <div>
        <TextAreaInput
          resizable={false}
          withTopLabel
          label="Комментарий"
          name="comment"
          size={[2, 3]}
        />
      </div>

      <div>
        <SelectInput
          size={250}
          name="user_id"
          withTopLabel
          label="Ответственный менеджер"
          options={transformForSelect(order?.users, 'id', 'name')}
        />
      </div>
    </div>
  );
};

export default EditForm;
