import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email must be valid.').required('The field is required.'),
  password: Yup.string().required('The field is required.'),
});

export const registerValidationSchema = Yup.object()
  .shape({
    name: Yup.string().required('The field is required.'),
    password_confirmation: Yup.string()
      .required('The field is required.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })
  .concat(loginValidationSchema);
