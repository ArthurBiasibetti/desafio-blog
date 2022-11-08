import * as yup from 'yup';

export const createUserSchema = yup.object({
  body: yup
    .object()
    .shape({
      name: yup
        .string()
        .max(120, { field: 'name', error: 'MAX_LENGTH', maxLength: 120 })
        .required({ field: 'name', error: 'IS_REQUIRED' }),
      email: yup.string().required({ field: 'email', error: 'IS_REQUIRED' }),
      password: yup
        .string()
        .required({ field: 'password', error: 'IS_REQUIRED' }),
    })
    .required(),
});

export const searchUserSchema = yup.object({
  params: yup
    .object()
    .shape({
      id: yup
        .string()
        .uuid({ field: 'id', error: 'IS_NOT_UUID' })
        .required({ field: 'id', error: 'IS_REQUIRED' }),
    })
    .required(),
});
