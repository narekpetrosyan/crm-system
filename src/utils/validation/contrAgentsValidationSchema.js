import * as Yup from 'yup';

export const createContrAgentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is required.'),
  // contactListContragent: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string().required('Field is required.'),
  //       phone: Yup.string().required('Field is required.'),
  //       email: Yup.string().required('Field is required.'),
  //       position: Yup.string().required('Field is required.'),
  //       phone_dop: Yup.string().required('Field is required.'),
  //     }),
  //   )
  //   .required('Fields are required.'),
  // objList: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string().required('Field is required.'),
  //       address: Yup.string().required('Field is required.'),
  //       contacts: Yup.array()
  //         .of(
  //           Yup.object().shape({
  //             name: Yup.string().required('Field is required.'),
  //             phone: Yup.string().required('Field is required.'),
  //             email: Yup.string().required('Field is required.'),
  //             position: Yup.string().required('Field is required.'),
  //             phone_dop: Yup.string().required('Field is required.'),
  //           }),
  //         )
  //         .required('Fields are required.'),
  //     }),
  //   )
  //   .required('Fields are required.'),
});
