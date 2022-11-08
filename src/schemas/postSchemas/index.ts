import * as yup from 'yup';

export const createPostSchema = yup.object({
  body: yup
    .object()
    .shape({
      name: yup.string().required({ field: 'name', error: 'IS_REQUIRED' }),
      description: yup
        .string()
        .required({ field: 'description', error: 'IS_REQUIRED' }),
      categories: yup
        .array(yup.string())
        .min(1, { field: 'categories', error: 'MIN_LENGTH', minLength: 1 })
        .required({ field: 'categories', error: 'IS_REQUIRED' }),
    })
    .required(),
});
