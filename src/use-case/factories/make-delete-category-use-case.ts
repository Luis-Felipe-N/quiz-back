import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { DeleteCategoryUseCase } from '../delete-category.usecase'

export function makeDeleteCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const useCase = new DeleteCategoryUseCase(categoriesRepository)

  return useCase
}
