import { QuizzesRepository } from '@/repositories/quizzes-repository'
import { Quiz } from '@prisma/client'

interface CreateQuizUseCaseRequest {
  title: string
  description: string
  cover: string | null
  color: string | null
  creatorId: string
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
    creatorId,
    categorySlug,
  }: CreateQuizUseCaseRequest): Promise<CreateQuizUseCaseResponse> {
    const quiz = await this.quizRepository.create({
      title,
      description,
      cover,
      color,
      creator_id: creatorId,
      category_slug: categorySlug,
    })

    return { quiz }
  }
}
