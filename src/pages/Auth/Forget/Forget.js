import React from 'react';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/Button/Button';
import { TextInput } from '@components/Form/TextInput/TextInput';

import { Link } from 'react-router-dom';
import styles from './Forget.module.scss';

const Forget = () => {
  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const submitForm = (data) => {
    console.log(data);
    form.reset(
      { name: '', email: '', password: '', password_confirmation: '' },
      { keepValues: false },
    );
  };
  return (
    <div className={styles.ForgetWrapper}>
      <Typography className={styles.Heading} variant="inherit">
        Reset Password
      </Typography>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className={styles.FormWrapper}>
            <div className={styles.InputGroup}>
              <TextInput
                type="text"
                name="email"
                label="Email"
                id="email"
                withIcon
                iconName="envelope"
              />
            </div>
          </div>

          <div className={styles.ButtonCheckbox}>
            <Button color="primary">Send password reset link</Button>
          </div>
        </form>
      </FormProvider>

      <div className={styles.BottomLinks}>
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
};

export default Forget;
