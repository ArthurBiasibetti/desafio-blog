import { CategoryRepositoryMock } from '../../src/repositories/mocks/categoryRepositoryMock';
import CreateCategoryUseCase from '../../src/useCases/createCategory/CreateCategoryUseCase';

describe('Category', () => {
  const repository = new CategoryRepositoryMock();
  const sut = new CreateCategoryUseCase(repository);

  describe('Should be', () => {
    it('able to create a category', async () => {
      const categoryId = await sut.execute({ name: 'CategoriaNova' });

      expect(categoryId).toHaveProperty('id');
    });
  });

  describe('Should not be', () => {
    it('able to create an category', async () => {
      await expect(sut.execute({ name: 'Terror' })).rejects.toThrow(
        'CATEGORY_ALREADY_EXISTS'
      );
    });
  });
});
