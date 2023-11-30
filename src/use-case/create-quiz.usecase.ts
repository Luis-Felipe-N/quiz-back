import { QuizzesRepository } from '@/repositories/quiz-repository'
import { Quiz } from '@prisma/client'

interface CreateQuizUseCaseRequest {
  title: string
  description: string
  cover: string | null
  color: string | null
  categorySlug: string
}

interface CreateQuizUseCaseResponse {
  quiz: Quiz
}

export class CreateQuizUseCase {
  constructor(private quizRepository: QuizzesRepository) {}

  async execute({
    title,
    description,
    cover,
    color,
    categorySlug,
  }: CreateQuizUseCaseRequest): Promise<CreateQuizUseCaseResponse> {
    const quiz = await this.quizRepository.create({
      title,
      description,
      cover,
      color,
      category_slug: categorySlug,
    })

    return { quiz }
  }
}
