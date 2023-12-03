import { QuestionsRepository } from '@/repositories/questions-repository'
import { Question } from '@prisma/client'
import { MaxResourceError } from './errors/max-resource-error'

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
    const questions = await this.questionsRepository.findManyByQuizId(quizId)

    if (questions.length >= 5) {
      throw new MaxResourceError()
    }
    const question = await this.questionsRepository.create({
      content,
      quiz_id: quizId,
    })

    return { question }
  }
}
