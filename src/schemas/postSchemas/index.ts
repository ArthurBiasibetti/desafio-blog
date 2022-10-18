import * as yup from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *        - name
 *        - description
 *       properties:
 *         name:
 *           type: string
 *           example: Coleções incriveis
 *         description:
 *           type: string
 *           example: conheça as melhores coleções do mundo!
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           example: ["5908f557-8023-4049-bf93-e68ecd1864f0", "65dc8a23-555e-4b3e-9e27-a7b67579e78c"]
 */

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
