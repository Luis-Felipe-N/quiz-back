import { Prisma, Category } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>
  delete(slug: string): void
  findBySlug(slug: string): Promise<Category | null>
  searchMany(query: string, page: number): Promise<Category[]>
}
