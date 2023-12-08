import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetCategoryUseCaseRequest {
  categorySlug: string
}

interface GetCategoryUseCaseResponse {
  category: Category
}

export class GetCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categorySlug,
  }: GetCategoryUseCaseRequest): Promise<GetCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findBySlug(categorySlug)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return { category }
  }
}
