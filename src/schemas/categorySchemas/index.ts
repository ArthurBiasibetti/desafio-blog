import * as yup from 'yup';

export const createCategorySchema = yup.object({
  body: yup
    .object()
    .shape({
      name: yup
        .string()
        .max(50, { field: 'name', error: 'MAX_LENGTH', maxLength: 50 })
        .required({ field: 'name', error: 'IS_REQUIRED' }),
    })
    .required(),
});
