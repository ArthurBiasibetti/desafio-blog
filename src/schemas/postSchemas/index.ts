import * as yup from 'yup';

export const createPostSchema = yup.object({
  body: yup
    .object({
      name: yup.string().required('name is required!'),
      description: yup.string().required('description is required!'),
      categories: yup
        .array()
        .min(1, 'is necessary at least one category')
        .required('categories is required!'),
    })
    .required(),
});
