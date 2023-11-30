import { Prisma, Quiz } from '@prisma/client'

export interface QuizzesRepository {
  create(data: Prisma.QuizUncheckedCreateInput): Promise<Quiz>
}
