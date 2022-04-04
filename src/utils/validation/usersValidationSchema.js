import * as Yup from 'yup';

export const createUserValidationSchema = Yup.object().shape({
  name: Yup.string().required('The field is required.'),
  email: Yup.string().email('Email must be valid.').required('The field is required.'),
  password: Yup.string().required('The field is required.'),
});
