import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { QuizzesRepository } from '../quizzes-repository'

export class PrismaQuizzesRepository implements QuizzesRepository {
  async findManyByUser(userId: string, page: number) {
    const quizzes = await prisma.quiz.findMany({
      where: {
        creator_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return quizzes
  }

  async findManyByCategory(categorySlug: string, page: number) {
    const quizzes = await prisma.quiz.findMany({
      where: {
        category_slug: categorySlug,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return quizzes
  }

  async findById(id: string) {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id,
      },
    })

    return quiz
  }

  async create(data: Prisma.QuizUncheckedCreateInput) {
    const quiz = await prisma.quiz.create({
      data,
    })

    return quiz
  }
}
