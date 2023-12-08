import { GetCategoryUseCase } from '../get-category.usecase'
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'

export function makeGetCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const useCase = new GetCategoryUseCase(categoriesRepository)

  return useCase
}
