import React from 'react';
import styles from '../CreateOrder/CreateOrder.module.scss';
import { SelectInput } from '../../../components/Form/SelectInput/SelectInput';
import { TextInput } from '../../../components/Form/TextInput/TextInput';
import { CheckboxLabel } from '../../../components/Form/CheckboxLabel/CheckboxLabel';
import DateInput from '../../../components/Form/DateInput/DateInput';
import TextAreaInput from '../../../components/Form/TextAreaInput/TextAreaInput';
import { transformForSelect } from '../../../utils/helpers/transformForSelect';
import { useCaValues } from '../hooks/useCaValues';
import { useFormContext } from 'react-hook-form';
import { workTypes } from '../../../utils/helpers/staticSeletcData';
import { useDefaultValues } from '../hooks/useDefaultValues';

const EditForm = ({ control, order }) => {
  const { setValue } = useFormContext();
  const {
    contrAgents,
    contrAgentsLoading,
    caObjectsLoading,
    caObjects,
    caOContactList,
    caOContactListLoading,
  } = useCaValues(control, setValue);
  useDefaultValues(contrAgents, caObjects, caOContactList);

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
        <TextInput control={control} type="number" name="price" withTopLabel label="Ставка в час" />
      </div>

      <div className={styles.CreateOrderFormBlock}>
        <SelectInput name="work_type" options={workTypes} withTopLabel label="Единица измерения" />
        <TextInput
          control={control}
          type="number"
          name="w_price"
          withTopLabel
          label="Стоимость для работника"
        />
        <DateInput variant="datetime" name="start_time" label="Начало смены" />
        <DateInput variant="datetime" name="end_time" label="Окончание смены" />
        <CheckboxLabel name="is_payment" label="Оплачено заказчиком" />
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
