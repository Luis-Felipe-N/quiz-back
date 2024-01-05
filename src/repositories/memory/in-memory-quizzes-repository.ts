import { Prisma, Quiz } from '@prisma/client'
import { QuizzesRepository } from '../quizzes-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryQuizzesRepository implements QuizzesRepository {
  async findManyByUser(userId: string, page: number) {
    const quizzes = this.items.filter((item) => item.creator_id === userId)

    return quizzes
  }

  public items: Quiz[] = []

  async findManyByCategory(categorySlug: string, page: number) {
    const quizzes = this.items.filter(
      (item) => item.category_slug === categorySlug,
    )

    return quizzes
  }

  async findById(id: string) {
    const quizMemory = this.items.find((quiz) => id === quiz.id)

    if (!quizMemory) {
      return null
    }

    return quizMemory
  }

  async create(data: Prisma.QuizUncheckedCreateInput) {
    const quiz = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      cover: data.cover || null,
      color: data.color || null,
      category_slug: data.category_slug,
      creator_id: data.creator_id,
      created_at: new Date(),
    }
    this.items.push(quiz)

    return quiz
  }
}
