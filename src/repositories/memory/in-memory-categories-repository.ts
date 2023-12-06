import { Category, Prisma, Question } from '@prisma/client'
import slugify from 'slugify'
import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category: Category = {
      slug: slugify(data.title, { lower: true }),
      title: data.title,
      description: data.description,
      color: data.color,
      cover: data.cover,
    }
    this.items.push(category)

    return category
  }

  async findBySlug(slug: string) {
    const categoryMemory = this.items.find((category) => slug === category.slug)

    if (!categoryMemory) {
      return null
    }

    return categoryMemory
  }
}