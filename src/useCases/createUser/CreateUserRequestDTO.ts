/**
 * @example {
 *  "password": "52907745-7672-470e-a803-a2f8feb52944",
 *  "name": "John Doe",
 *  "email": "salve"
 * }
 */

export interface ICreateUserRequestDTO {
  name: string;
  password: string;
  email: string;
}
