import { PrismaQuestionsRepository } from '@/repositories/prisma/prisma-questions-repository'
import { FetchQuestionsByQuizUseCase } from '../fetch-questions-by-quiz.usecase'

export function makeFetchQuestionsByQuizUseCase() {
  const questionsRepository = new PrismaQuestionsRepository()
  const useCase = new FetchQuestionsByQuizUseCase(questionsRepository)

  return useCase
}
