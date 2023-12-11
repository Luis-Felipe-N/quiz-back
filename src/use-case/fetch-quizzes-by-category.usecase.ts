import { QuizzesRepository } from '@/repositories/quizzes-repository'
import { Quiz } from '@prisma/client'

interface FetchQuizzesByCategoryUseCaseRequest {
  categorySlug: string
  page: number
}

interface FetchQuizzesByCategoryUseCaseResponse {
  quizzes: Quiz[]
}

export class FetchQuizzesByCategoryUseCase {
  constructor(private quizzesRepository: QuizzesRepository) {}

  async execute({
    categorySlug,
    page,
  }: FetchQuizzesByCategoryUseCaseRequest): Promise<FetchQuizzesByCategoryUseCaseResponse> {
    const quizzes = await this.quizzesRepository.findManyByCategory(
      categorySlug,
      page,
    )

    return { quizzes }
  }
}
