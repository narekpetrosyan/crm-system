import * as Yup from 'yup';

export const createCallValidationSchema = Yup.object().shape({
  time: Yup.string().required('The field is required.'),
  contragent_id: Yup.string().required('The field is required.'),
  contact_id: Yup.string().required('The field is required.'),
});
