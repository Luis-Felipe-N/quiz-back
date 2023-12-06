import { Prisma } from '@prisma/client'
import { QuestionsRepository } from '../questions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaQuestionsRepository implements QuestionsRepository {
  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = await prisma.question.create({
      data,
    })

    return question
  }

  async findById(id: string) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    })

    return question
  }

  async findManyByQuizId(quizId: string) {
    const categories = await prisma.question.findMany({
      where: {
        quiz_id: quizId,
      },
    })

    return categories
  }
}
