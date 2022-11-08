import * as yup from 'yup';

export const createSessionSchema = yup.object({
  body: yup
    .object()
    .shape({
      email: yup.string().required({ field: 'email', error: 'IS_REQUIRED' }),
      password: yup
        .string()
        .required({ field: 'password', error: 'IS_REQUIRED' }),
    })
    .required(),
});
