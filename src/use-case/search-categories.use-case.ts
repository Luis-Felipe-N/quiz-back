import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'

interface SearchCategoriesUseCaseRequest {
  query: string
  page: number
}

interface SearchCategoriesUseCaseResponse {
  categories: Category[]
}

export class SearchCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    query,
    page,
  }: SearchCategoriesUseCaseRequest): Promise<SearchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.searchMany(query, page)
    return { categories }
  }
}
