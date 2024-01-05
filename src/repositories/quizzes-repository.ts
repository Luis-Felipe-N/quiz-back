import { Prisma, Quiz } from '@prisma/client'

export interface QuizzesRepository {
  create(data: Prisma.QuizUncheckedCreateInput): Promise<Quiz>
  findById(id: string): Promise<Quiz | null>
  findManyByCategory(categorySlug: string, page: number): Promise<Quiz[]>
  findManyByUser(userId: string, page: number): Promise<Quiz[]>
}
