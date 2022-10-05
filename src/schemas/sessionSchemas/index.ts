import * as yup from 'yup';

export const createSessionSchema = yup.object({
  body: yup
    .object({
      email: yup.string().required('email is required!'),
      password: yup.string().required('password is required!'),
    })
    .required(),
});
