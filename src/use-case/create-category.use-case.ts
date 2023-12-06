import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'

interface CreateCategoryUseCaseRequest {
  title: string
  description: string
  cover: string
  color: string
}

interface CreateCategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    title,
    description,
    color,
    cover,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.create({
      slug: '',
      title,
      description,
      cover,
      color,
    })

    return { category }
  }
}
