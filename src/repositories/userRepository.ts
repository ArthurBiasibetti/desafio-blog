import AppDataSource from '../database';
import { UserEntity } from '../database/entities/User.Entity';
import { UserModel } from '../database/models/User.model';
import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(UserEntity);

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: { posts: true },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
      relations: { posts: true },
    });

    return user;
  }

  async create(userData: UserModel): Promise<string> {
    const user = new UserEntity();
    user.email = userData.email;
    user.password = userData.password;
    user.name = userData.name;

    await this.repository.save(user);

    return user.id;
  }
}
