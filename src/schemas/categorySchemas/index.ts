import * as yup from 'yup';

export const createCategorySchema = yup.object({
  body: yup
    .object({
      name: yup
        .string()
        .max(50, 'name is max length 50')
        .required('name is required!'),
    })
    .required(),
});
