import { UserEntity } from '../../database/entities/User.Entity';
import { UserModel } from '../../database/models/User.model';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  create(userData: UserModel): Promise<string>;
}
