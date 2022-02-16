import React, { useEffect, useMemo, memo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from '@components/Button/Button';
import InnerLayout from '@layouts/InnerLayout/InnerLayout';
import { createUserValidationSchema } from '@utils/validation/usersValidationSchema';
import { transformForSelect } from '@utils/helpers/transformForSelect';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { SelectInput } from '@components/Form/SelectInput/SelectInput';
import { CheckboxLabel } from '@components/Form/CheckboxLabel/CheckboxLabel';
import PageHeading from '@components/PageHeading/PageHeading';
import { useStore } from '@hooks/useStore';

import styles from './EditUser.module.scss';

const EditUser = observer(() => {
  const { id } = useParams();
  const { usersStore } = useStore();

  useEffect(() => {
    usersStore.getUserById(id);
    usersStore.fetchPermissonsAndCities();
  }, [id]);

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createUserValidationSchema),
    defaultValues: useMemo(
      () => ({
        name: usersStore.user?.name,
        email: usersStore.user?.email,
        password: '',
        permissions: [],
        is_admin: false,
        city_id: usersStore.user?.city_id,
      }),
      [usersStore.user],
    ),
  });

  useEffect(() => {
    form.reset(usersStore.user);
  }, [usersStore.user]);

  const submitForm = (data) => {
    usersStore.saveUser(data, id);
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
        <Button clickHandler={form.handleSubmit(submitForm)} size={150}>
          Сохранить
        </Button>
      </div>
    </InnerLayout>
  );
});

export default memo(EditUser);
