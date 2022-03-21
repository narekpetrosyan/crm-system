import React, { useEffect, memo } from 'react';
import { Button } from '@components/Button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserValidationSchema } from '@utils/validation/usersValidationSchema';
import { useStore } from '@hooks/useStore';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import { CheckboxLabel } from '@components/Form/CheckboxLabel/CheckboxLabel';
import PageHeading from '@components/PageHeading/PageHeading';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';

import styles from './CreateUser.module.scss';

const CreateUser = observer(() => {
  const { usersStore } = useStore();
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createUserValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      permissions: [],
      is_admin: false,
      city_id: '',
    },
  });

  useEffect(() => {
    usersStore.fetchPermissonsAndCities();
  }, []);

  const submitForm = (data) => {
    const dataToSend = {
      ...data,
      permissions: data.permissions.filter(Boolean),
    };
    usersStore.createUser(dataToSend);
    form.reset({}, { keepValues: false });
  };

  return (
    <InnerLayout>
      <PageHeading title="Редактирование пользователя!" />

      <div className={styles.UsersInnerBody}>
        {!usersStore.isLoading && (
          <FormProvider {...form}>
            <form>
              <div className={styles.FormInputs}>
                <TextInput type="text" name="name" label="Имя" id="name" />
                <TextInput type="email" name="email" label="Email" id="email" />
                <SelectInput
                  name="city_id"
                  label="Город"
                  options={transformForSelect(usersStore.cities, 'id', 'name')}
                />
                <TextInput type="password" name="password" label="Пароль" id="password" />
                <CheckboxLabel label="Администратор" name="is_admin" />
              </div>

              <div className={styles.FormPermissions}>
                {usersStore.permissions.map((permItem, index) => (
                  <CheckboxLabel
                    value={permItem.id}
                    key={permItem.id}
                    label={permItem.name}
                    name={`permissions.${index}`}
                    size={13}
                  />
                ))}
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      <div className={styles.UsersInnerSave}>
        <Button clickHandler={form.handleSubmit(submitForm)} size={150}>
          Сохранить
        </Button>
      </div>
    </InnerLayout>
  );
});

export default memo(CreateUser);
