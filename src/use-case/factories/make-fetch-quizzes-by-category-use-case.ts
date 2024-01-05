import { FetchQuizzesByCategoryUseCase } from '../fetch-quizzes-by-category.usecase'
import { PrismaQuizzesRepository } from '@/repositories/prisma/prisma-quizzes-repository'

export function makeFetchQuizzesByCategoryUseCase() {
  const quizzesRepository = new PrismaQuizzesRepository()
  const useCase = new FetchQuizzesByCategoryUseCase(quizzesRepository)

  return useCase
}
