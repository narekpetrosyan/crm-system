import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Heading from '@components/Heading/Heading';
import { Button } from '@components/Button/Button';
import { TextInput } from '@components/Form/TextInput/TextInput';
import { useStore } from '@hooks/useStore';
import { registerValidationSchema } from '@utils/validation/authValidationSchema';

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

  const { control, reset } = form;

  const submitForm = (data) => {
    authStore.register(data);
    reset({ name: '', email: '', password: '', password_confirmation: '' }, { keepValues: false });
  };

  return (
    <div className={styles.RegisterWrapper}>
      <Heading className={styles.Heading}>Register a new membership</Heading>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className={styles.FormWrapper}>
            <div className={styles.InputGroup}>
              <TextInput
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
            <Button disabled={authStore.isLoading} loading={authStore.isLoading} color="primary">
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
