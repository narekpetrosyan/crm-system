import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@components/Button/Button';
import PageHeading from '@components/PageHeading/PageHeading';
import { TextInput } from '@components/Form/TextInput/TextInput';
import ObjectContactsNestedFields from './ObjectContactsNestedFields';

import styles from '../EditContrAgent.module.scss';

const ObjectsNestedFields = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'objList',
  });

  return (
    <div className={styles.EditContrAgentFormAddedBlock}>
      <PageHeading title="Объекты" />
      {fields.map((item, index) => (
        <div key={item.id} className={styles.EditContrAgentFormAddedBlockItem}>
          <div className={styles.EditContrAgentFormContrAgentBlock}>
            <TextInput
              control={control}
              withTopLabel
              label="Наименование объекта"
              name={`objList[${index}].name`}
            />
            <TextInput
              control={control}
              withTopLabel
              label="Адрес объекта"
              name={`objList[${index}].address`}
            />
            <Button color="danger" size={150} clickHandler={() => remove(index)}>
              Удалить
            </Button>
          </div>

          <div>
            <PageHeading title="Контактные лица" />
            <ObjectContactsNestedFields index={index} control={control} />
          </div>
        </div>
      ))}
      <Button color="primary" size={200} clickHandler={() => append('contactListContragent')}>
        Добавить объект
      </Button>
    </div>
  );
};

export default ObjectsNestedFields;
