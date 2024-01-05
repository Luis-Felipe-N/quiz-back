import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { SearchCategoriesUseCase } from '../search-categories.usecase'

export function makeSearchCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const useCase = new SearchCategoriesUseCase(categoriesRepository)

  return useCase
}
