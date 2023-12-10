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

  async delete(slug: string) {
    const categories = this.items.filter((item) => item.slug !== slug)

    this.items = categories
  }

  async findBySlug(slug: string) {
    const categoryMemory = this.items.find((category) => slug === category.slug)

    if (!categoryMemory) {
      return null
    }

    return categoryMemory
  }

  async searchMany(query: string, page: number) {
    if (!query.trim()) {
      const categories = this.items.slice((page - 1) * 20, page * 20)

      return categories
    }

    const categories = this.items
      .filter((item) =>
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .slice((page - 1) * 20, page * 20)

    return categories
  }
}
