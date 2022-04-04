import * as Yup from 'yup';

export const createWorkerValidationSchema = Yup.object().shape({
  name: Yup.string().required('The field is required.'),
  surname: Yup.string().required('The field is required.'),
  patronymic: Yup.string().required('The field is required.'),
  dt_birth: Yup.string().required('The field is required.'),
  phone: Yup.string().required('The field is required.'),
});
