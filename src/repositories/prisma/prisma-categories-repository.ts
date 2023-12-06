import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async searchMany(query: string, page: number) {
    if (!query.trim()) {
      const categories = await prisma.category.findMany({
        skip: (page - 1) * 20,
        take: 20,
      })

      return categories
    }

    const categories = await prisma.category.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return categories
  }

  async findBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
    })

    return category
  }

  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = await prisma.category.create({
      data,
    })

    return category
  }
}
