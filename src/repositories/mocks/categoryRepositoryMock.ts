import { upperCase } from 'lodash';
import { CategoryEntity } from '../../database/entities/Category.Entity';
import { CategoryModel } from '../../database/models/Category.model';
import { ICategoryRepository } from '../../interfaces/ICategoryRepository';

const categoryMocks: CategoryEntity[] = [
  {
    id: '84157d61-799a-4f15-9433-fcc4b2ba9162',
    created_at: new Date('2022-10-31T18:41:48.383Z'),
    updated_at: new Date('2022-10-31T18:41:48.383Z'),
    name: 'Terror',
    posts: [],
  },
  {
    id: 'fb3db7c9-6421-4f07-9b91-59da3df4f3f5',
    created_at: new Date('2022-11-01T15:30:46.382Z'),
    updated_at: new Date('2022-11-01T15:30:46.382Z'),
    name: 'Saude',
    posts: [],
  },
  {
    id: 'd0b79e28-e4a5-4fc0-a720-ebde139d57c7',
    created_at: new Date('2022-11-08T18:35:36.530Z'),
    updated_at: new Date('2022-11-08T18:35:36.530Z'),
    name: 'Bem estar',
    posts: [],
  },
  {
    id: '1b96b0f9-2fde-416d-b187-84fff2100018',
    created_at: new Date('2022-11-08T18:35:45.229Z'),
    updated_at: new Date('2022-11-08T18:35:45.229Z'),
    name: 'Tecnologia',
    posts: [],
  },
];

export class CategoryRepositoryMock implements ICategoryRepository {
  async create(categoryData: CategoryModel): Promise<string> {
    const category = new CategoryEntity();
    category.name = categoryData.name;

    return category.id;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return categoryMocks;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = categoryMocks.find(
      (_category) => upperCase(_category.name) === upperCase(name)
    );

    return category || null;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = categoryMocks.find((_category) => _category.id === id);

    return category || null;
  }
}
