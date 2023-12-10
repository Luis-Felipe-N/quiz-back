import { CategoriesRepository } from '@/repositories/categories-repository'

interface DeleteCategoryUseCaseRequest {
  categorySlug: string
}

export class DeleteCategoryUseCase {
  constructor(private categories: CategoriesRepository) {}
  async execute({ categorySlug }: DeleteCategoryUseCaseRequest) {
    await this.categories.delete(categorySlug)
  }
}
