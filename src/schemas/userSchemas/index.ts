import * as yup from 'yup';

export const createUserSchema = yup.object({
  body: yup
    .object({
      name: yup
        .string()
        .max(120, 'name is max length 120')
        .required('name is required!'),
      email: yup.string().required('email is required!'),
      password: yup.string().required('password is required!'),
    })
    .required(),
});
