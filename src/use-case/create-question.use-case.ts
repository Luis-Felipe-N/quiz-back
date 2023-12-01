import { QuestionsRepository } from '@/repositories/questions-repository'
import { Question } from '@prisma/client'

interface CreateQuestionUseCaseRequest {
  content: string
  quizId: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    content,
    quizId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = await this.questionsRepository.create({
      content,
      quiz_id: quizId,
    })

    return { question }
  }
}
