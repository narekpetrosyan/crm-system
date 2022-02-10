import React from 'react';
import { Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './CreateUser.module.scss';

export const CreateUser = () => {
  const form = useForm();

  const submitForm = (data) => {
    console.log(data);
    form.reset({}, { keepValues: false });
  };

  return (
    <>
      <div className={styles.UsersInnerHeader}>
        <Typography variant="h3">Редактирование пользователя!</Typography>
      </div>

      <div className={styles.UsersInnerBody}>
        <FormProvider>
          <form>
            <div>
              <input type="text" />
            </div>
          </form>
        </FormProvider>
      </div>

      <div className={styles.UsersInnerSave}>
        <Button onClick={form.handleSubmit(submitForm)}>Сохранить</Button>
      </div>
    </>
  );
};
