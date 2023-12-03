import { Prisma, Question } from '@prisma/client'
import { QuestionsRepository } from '../questions-repository'
import { randomUUID } from 'crypto'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = {
      id: randomUUID(),
      content: data.content,
      quiz_id: data.quiz_id,
    }
    this.items.push(question)

    return question
  }

  async findById(id: string) {
    const questionMemory = this.items.find((question) => id === question.id)

    if (!questionMemory) {
      return null
    }

    return questionMemory
  }

  async findManyByQuizId(quizId: string) {
    const questions = this.items.filter((item) => item.quiz_id === quizId)

    return questions
  }
}
