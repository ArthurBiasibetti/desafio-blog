// import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { UserEntity } from '../entities/User.Entity';

// export default class UserAdminSeeder implements Seeder {
//   public async run(
//     dataSource: DataSource,
//     factoryManger: SeederFactoryManager
//   ): Promise<any> {
//     const repository = dataSource.getRepository(UserEntity);

//     // password = 123;
//     await repository.insert([
//       {
//         name: 'Admin',
//         email: 'admin@gmail.com',
//         password:
//           '$2b$10$A2neJfCapjIacAape1GKbOfKlZRM5AXfI88GQqlS/BaM9F29dahB6',
//       },
//     ]);

//     const userFactory = factoryManger.get(UserEntity);

//     await userFactory.save();
//   }
// }

import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/User.Entity';
import logger from '../../config/logger';

export default class UserSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    try {
      const repository = dataSource.getRepository(UserEntity);

      await repository.insert([
        {
          name: 'Admin',
          email: 'admin@gmail.com',
          password:
            '$2b$10$A2neJfCapjIacAape1GKbOfKlZRM5AXfI88GQqlS/BaM9F29dahB6',
          role: 'ADMIN',
        },
      ]);
    } catch (error) {
      logger.error(
        'Algo deu errado verifique se esse dado já não existe no banco!'
      );
    }
  }
}
