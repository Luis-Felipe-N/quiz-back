import { Prisma, Question } from '@prisma/client'

export interface QuestionsRepository {
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>
  findById(id: string): Promise<Question | null>
  findManyByQuizId(quizId: string): Promise<Question[]>
}
