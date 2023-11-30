import { QuizzesRepository } from '@/repositories/quizzes-repository'
import { Quiz } from '@prisma/client'

interface FetchQuizzesByCategoryRequest {
  categorySlug: string
  page: number
}

interface FetchQuizzesByCategoryResponse {
  quizzes: Quiz[]
}

export class FetchQuizzesByCategory {
  constructor(private quizzesRepository: QuizzesRepository) {}

  async execute({
    categorySlug,
    page,
  }: FetchQuizzesByCategoryRequest): Promise<FetchQuizzesByCategoryResponse> {
    const quizzes = await this.quizzesRepository.findManyByCategory(
      categorySlug,
      page,
    )

    return { quizzes }
  }
}
