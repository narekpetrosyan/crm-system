import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { loginValidationSchema } from '@utils/validation/authValidationSchema';
import { observer } from 'mobx-react-lite';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { Button } from '@components/Button/Button';
import { CheckboxLabel } from '@components/Form/CheckboxLabel/CheckboxLabel';
import { useStore } from '@hooks/useStore';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './Login.module.scss';

const Login = observer(() => {
  const { authStore } = useStore();

  const form = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const submitForm = (data) => {
    authStore.login(data);
    form.reset({ email: '', password: '' }, { keepValues: false });
  };

  return (
    <div className={styles.LoginWrapper}>
      <Typography className={styles.Heading} variant="inherit">
        Sign in to start your session
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
          </div>

          <div className={styles.ButtonCheckbox}>
            <CheckboxLabel label="Remember Me" name="rememberMe" />
            <Button color="primary" className={styles.SubmitButton} disabled={authStore.isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className={styles.BottomLinks}>
        <Link to="/forget">I forgot my password</Link>
        <Link to="/register">Register a new membership</Link>
      </div>
    </div>
  );
});

export default Login;
