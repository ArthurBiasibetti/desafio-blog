import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/User.Entity';
import logger from '../../config/logger';
import hash from '../../utils/hash.utils';

export default class UserSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    try {
      const password = await hash('123');
      const repository = dataSource.getRepository(UserEntity);

      await repository.insert([
        {
          name: 'Admin',
          email: 'admin@gmail.com',
          role: 'ADMIN',
          password,
        },
      ]);
    } catch (error) {
      logger.error(
        'Algo deu errado verifique se esse dado já não existe no banco!'
      );
    }
  }
}
