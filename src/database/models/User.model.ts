export type UserRoles = 'ADMIN' | 'USER';

export interface UserModel {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
}
