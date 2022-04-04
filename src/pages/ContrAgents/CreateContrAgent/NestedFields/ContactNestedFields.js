import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@components/Button/Button';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';

import styles from '../CreateContrAgent.module.scss';

const ContactNestedFields = observer(({ control }) => {
  const {
    fields: contrAgentContacts,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'contactListContragent',
  });

  return (
    <div className={styles.CreateContrAgentFormAddedBlock}>
      <PageHeading title="Контактные лица" />
      {contrAgentContacts.map((item, index) => (
        <div key={item.id} className={styles.CreateContrAgentFormAddedBlockItem}>
          <div className={styles.CreateContrAgentFormContrAgentBlock}>
            <TextInput
              control={control}
              withTopLabel
              label="ФИО"
              name={`contactListContragent[${index}].name`}
            />
            <TextInput
              control={control}
              withTopLabel
              label="Должность"
              name={`contactListContragent[${index}].position`}
            />
            <TextInput
              control={control}
              type="number"
              withTopLabel
              label="Номер телефона"
              name={`contactListContragent[${index}].phone`}
            />
          </div>
          <div className={styles.CreateContrAgentFormContrAgentBlock}>
            <TextInput
              control={control}
              type="number"
              withTopLabel
              label="Доп. телефон"
              name={`contactListContragent[${index}].phone_dop`}
            />
            <TextInput
              control={control}
              withTopLabel
              label="Email"
              name={`contactListContragent[${index}].email`}
            />
            <Button color="danger" size={150} clickHandler={() => remove(index)}>
              Удалить
            </Button>
          </div>
        </div>
      ))}

      <Button color="primary" size={200} clickHandler={() => append('contactListContragent')}>
        Добавить контактное лицо
      </Button>
    </div>
  );
});

export default ContactNestedFields;
