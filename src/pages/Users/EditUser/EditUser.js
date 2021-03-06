import React, { useEffect, memo } from 'react';
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
  const { usersStore, authStore } = useStore();

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createUserValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      permissions: [],
      is_admin: usersStore.user?.is_admin,
      city_id: '',
    },
  });

  const { setValue, control, reset } = form;

  useEffect(() => {
    Promise.all([usersStore.fetchPermissionsAndCities(), usersStore.getUserById(id)]).then(() => {
      setValue('name', usersStore.user.name);
      setValue('email', usersStore.user.email);
      setValue('is_admin', usersStore.user?.is_admin);
      setValue('city_id', usersStore.user?.city_id);
      setValue(`permissions`, [...usersStore.user.permissions]);
    });
  }, [reset]);

  useEffect(() => {
    form.reset(usersStore.user);
  }, [usersStore.user]);

  const submitForm = (data) => {
    const dataToSend = {
      ...data,
      permissions: [...data.permissions.filter(Boolean)],
      city_id: data?.city_id?.value,
    };
    usersStore.saveUser(dataToSend, id).then(() => authStore.getMe());

    form.reset({}, { keepValues: false });
  };

  return (
    <InnerLayout>
      <PageHeading title="???????????????????????????? ????????????????????????!" />

      <div className={styles.UsersInnerBody}>
        {!usersStore.isLoading && (
          <FormProvider {...form}>
            <form>
              <div className={styles.FormInputs}>
                <TextInput type="text" name="name" label="??????" id="name" control={control} />
                <TextInput type="email" name="email" label="Email" id="email" control={control} />
                <SelectInput
                  name="city_id"
                  label="??????????"
                  options={transformForSelect(usersStore.cities, 'id', 'name')}
                  className={styles.FormInputsSelect}
                />
                <TextInput
                  type="password"
                  name="password"
                  label="????????????"
                  id="password"
                  control={control}
                />
                <CheckboxLabel label="??????????????????????????" name="is_admin" />
              </div>

              <div className={styles.FormPermissions}>
                {usersStore.permissions.map((permItem, index) => (
                  <CheckboxLabel
                    value={permItem.id}
                    key={permItem.id}
                    label={permItem.name}
                    name={`permissions[${index}]`}
                    size={13}
                  />
                ))}
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      <div className={styles.UsersInnerSave}>
        <Button
          color="submit"
          clickHandler={form.handleSubmit(submitForm)}
          size={150}
          disabled={usersStore.isLoading}
          loading={usersStore.isLoading}
        >
          ??????????????????
        </Button>
      </div>
    </InnerLayout>
  );
});

export default memo(EditUser);
