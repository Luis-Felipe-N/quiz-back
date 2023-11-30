import { PrismaQuizzesRepository } from '@/repositories/prisma/prisma-quizzes-repository'
import { CreateQuizUseCase } from '../create-quiz.usecase'

export function makeCreateQuizUseCase() {
  const quizzesRepository = new PrismaQuizzesRepository()
  const useCase = new CreateQuizUseCase(quizzesRepository)

  return useCase
}
