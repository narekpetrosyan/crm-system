import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { Button } from '@components/Button/Button';

import styles from '../EditContrAgent.module.scss';

const ObjectContactsNestedFields = ({ index, control }) => {
  const {
    fields: contrAgentObjectContacts,
    append: appendObjectContact,
    remove: removeObjectContact,
  } = useFieldArray({
    control,
    name: `objList[${index}].contacts`,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      {contrAgentObjectContacts.map((itemCont, idx) => (
        <div key={itemCont.id} className={styles.EditContrAgentFormAddedBlockItemNested}>
          <div className={styles.EditContrAgentFormContrAgentBlock}>
            <TextInput withTopLabel label="ФИО" name={`objList[${index}].contacts[${idx}].name`} />
            <TextInput
              withTopLabel
              label="Должность"
              name={`objList[${index}].contacts[${idx}].position`}
            />
            <TextInput
              type="number"
              withTopLabel
              label="Номер телефона"
              name={`objList[${index}].contacts[${idx}].phone`}
            />
          </div>
          <div className={styles.EditContrAgentFormContrAgentBlock}>
            <TextInput
              type="number"
              withTopLabel
              label="Доп. телефона"
              name={`objList[${index}].contacts[${idx}].phone_dop`}
            />
            <TextInput
              withTopLabel
              label="Email"
              name={`objList[${index}].contacts[${idx}].email`}
            />
            <Button color="danger" size={150} clickHandler={() => removeObjectContact(idx)}>
              Удалить
            </Button>
          </div>
        </div>
      ))}

      <Button
        color="primary"
        size={200}
        clickHandler={() => appendObjectContact('objList.contacts')}
      >
        Добавить контактное лицо
      </Button>
    </div>
  );
};

export default ObjectContactsNestedFields;
