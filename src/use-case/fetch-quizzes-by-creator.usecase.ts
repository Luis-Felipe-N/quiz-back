import { QuizzesRepository } from '@/repositories/quizzes-repository'
import { Quiz } from '@prisma/client'

interface FetchQuizzesByCreatorUseCaseRequest {
  userId: string
  page: number
}

interface FetchQuizzesByCreatorUseCaseResponse {
  quizzes: Quiz[]
}

export class FetchQuizzesByCreatorUseCase {
  constructor(private quizzesRepository: QuizzesRepository) {}

  async execute({
    userId,
    page,
  }: FetchQuizzesByCreatorUseCaseRequest): Promise<FetchQuizzesByCreatorUseCaseResponse> {
    const quizzes = await this.quizzesRepository.findManyByUser(userId, page)

    return { quizzes }
  }
}
