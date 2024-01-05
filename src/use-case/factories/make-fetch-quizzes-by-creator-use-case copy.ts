import { PrismaQuizzesRepository } from '@/repositories/prisma/prisma-quizzes-repository'
import { FetchQuizzesByCreatorUseCase } from '../fetch-quizzes-by-creator.usecase'

export function makeFetchQuizzesByCreatorUseCase() {
  const quizzesRepository = new PrismaQuizzesRepository()
  const useCase = new FetchQuizzesByCreatorUseCase(quizzesRepository)

  return useCase
}
