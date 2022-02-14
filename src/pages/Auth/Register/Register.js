import React from 'react';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema } from '@utils/validation/authValidationSchema';
import { observer } from 'mobx-react-lite';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { Button } from '@components/Button/Button';
import { useStore } from '@hooks/useStore';

import styles from './Register.module.scss';

const Register = observer(() => {
  const { authStore } = useStore();
  const form = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const submitForm = (data) => {
    authStore.register(data);
    form.reset(
      { name: '', email: '', password: '', password_confirmation: '' },
      { keepValues: false },
    );
  };

  return (
    <div className={styles.RegisterWrapper}>
      <Typography className={styles.Heading} variant="inherit">
        Register a new membership
      </Typography>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className={styles.FormWrapper}>
            <div className={styles.InputGroup}>
              <TextInput
                type="text"
                name="name"
                label="Full name"
                id="name"
                withIcon
                iconName="man"
              />
            </div>
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
            <div className={styles.InputGroup}>
              <TextInput
                type="password"
                name="password"
                label="Password"
                id="password"
                withIcon
                iconName="lock"
              />
            </div>
            <div className={styles.InputGroup}>
              <TextInput
                type="password"
                name="password_confirmation"
                label="Retype password"
                id="password_confirmation"
                withIcon
                iconName="login"
              />
            </div>
          </div>

          <div className={styles.ButtonCheckbox}>
            <Button disabled={authStore.isLoading} color="primary">
              Register
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className={styles.BottomLinks}>
        <Link to="/login">I already have a membership</Link>
      </div>
    </div>
  );
});

export default Register;
