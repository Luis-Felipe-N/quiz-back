import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import slugify from 'slugify'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

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
    const slugCategory = slugify(title, { lower: true })

    const categoryAlreadyExists =
      await this.categoriesRepository.findBySlug(slugCategory)

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoriesRepository.create({
      slug: slugify(title, { lower: true }),
      title,
      description,
      cover,
      color,
    })

    return { category }
  }
}
