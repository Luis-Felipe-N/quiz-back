import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import slugify from 'slugify'

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
    const categorySlug = slugify(title, { lower: true })

    const categoryAlreadyExists =
      await this.categoriesRepository.findBySlug(categorySlug)

    if (categoryAlreadyExists) {
      throw new Error()
    }

    const category = await this.categoriesRepository.create({
      slug: categorySlug,
      title,
      description,
      cover,
      color,
    })

    return { category }
  }
}
