import { CategoryRepositoryMock } from '../../src/repositories/mocks/categoryRepositoryMock';
import CreateCategoryUseCase from '../../src/useCases/createCategory/CreateCategoryUseCase';

describe('Category', () => {
  const repository = new CategoryRepositoryMock();

  describe('Should not be', () => {
    it('able to create an category', async () => {
      const sut = new CreateCategoryUseCase(repository);

      await expect(sut.execute({ name: 'Terror' })).rejects.toThrow(
        'CATEGORY_ALREADY_EXIs'
      );
    });
  });
});
