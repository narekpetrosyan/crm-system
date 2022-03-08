import * as Yup from 'yup';

export const createContrAgentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is required.'),
  address_legal: Yup.string().required('Field is required.'),
  address_actual: Yup.string().required('Field is required.'),
  price: Yup.string().required('Field is required.'),
  w_price: Yup.string().required('Field is required.'),
  w_price_step_one: Yup.string().required('Field is required.'),
  w_price_step_two: Yup.string().required('Field is required.'),
  INN: Yup.string().required('Field is required.'),
  KPP: Yup.string().required('Field is required.'),
  BIK: Yup.string().required('Field is required.'),
  ORGNIP: Yup.string().required('Field is required.'),
  bank_name: Yup.string().required('Field is required.'),
  short_account_number: Yup.string().required('Field is required.'),
  payment_account: Yup.string().required('Field is required.'),
  url: Yup.string().required('Field is required.'),
  comment: Yup.string().required('Field is required.'),
  city_id: Yup.string().required('Field is required.'),
  responsible_id: Yup.string().required('Field is required.'),
  status: Yup.string().required('Field is required.'),
  contactListContragent: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Field is required.'),
        phone: Yup.string().required('Field is required.'),
        email: Yup.string().required('Field is required.'),
        position: Yup.string().required('Field is required.'),
        phone_dop: Yup.string().required('Field is required.'),
      }),
    )
    .required('Fields are required.'),
  objList: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Field is required.'),
        address: Yup.string().required('Field is required.'),
        contacts: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required('Field is required.'),
              phone: Yup.string().required('Field is required.'),
              email: Yup.string().required('Field is required.'),
              position: Yup.string().required('Field is required.'),
              phone_dop: Yup.string().required('Field is required.'),
            }),
          )
          .required('Fields are required.'),
      }),
    )
    .required('Fields are required.'),
});
