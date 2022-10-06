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

export const searchUserSchema = yup.object({
  params: yup
    .object({
      id: yup
        .string()
        .uuid('id is required to be an uuid!')
        .required('id is required!'),
    })
    .required(),
});
