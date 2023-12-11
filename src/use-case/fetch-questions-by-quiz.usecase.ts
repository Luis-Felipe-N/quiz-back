import { QuestionsRepository } from '@/repositories/questions-repository'
import { Question } from '@prisma/client'

interface FetchQuestionsByQuizUseCaseRequest {
  quizId: string
}

interface FetchQuestionsByQuizUseCaseResponse {
  questions: Question[]
}

export class FetchQuestionsByQuizUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    quizId,
  }: FetchQuestionsByQuizUseCaseRequest): Promise<FetchQuestionsByQuizUseCaseResponse> {
    const questions = await this.questionsRepository.findManyByQuizId(quizId)

    return { questions }
  }
}
