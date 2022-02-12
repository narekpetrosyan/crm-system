import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createUserValidationSchema } from '@utils/validation/usersValidationSchema';
import { Button, Typography } from '@mui/material';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../hooks/useStore';
import { TextInput } from '../../../components/Form/TextInput/TextInput';
import { SelectInput } from '../../../components/Form/SelectInput/SelectInput';
import { CheckboxLabel } from '../../../components/Form/CheckboxLabel/CheckboxLabel';

import styles from './EditUser.module.scss';

export const EditUser = observer(() => {
  const { id } = useParams();
  const { usersStore } = useStore();

  useEffect(() => {
    usersStore.getUserById(id);
    usersStore.fetchPermissonsAndCities();
  }, [id, usersStore]);

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createUserValidationSchema),
    defaultValues: {
      name: usersStore.user?.name,
      email: usersStore.user?.email,
      password: '',
      permissions: [],
      is_admin: false,
      city_id: usersStore.user?.city_id,
    },
  });

  const submitForm = (data) => {
    usersStore.createUser(data);
    form.reset({}, { keepValues: false });
  };

  return (
    <div>
      <div className={styles.UsersInnerHeader}>
        <Typography variant="h3">Редактирование пользователя!</Typography>
      </div>

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
                {usersStore.permissions.map((permItem) => (
                  <CheckboxLabel
                    value={permItem.id}
                    key={permItem.id}
                    label={permItem.name}
                    name="permissions[]"
                    size={13}
                  />
                ))}
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      <div className={styles.UsersInnerSave}>
        <Button onClick={form.handleSubmit(submitForm)}>Сохранить</Button>
      </div>
    </div>
  );
});
