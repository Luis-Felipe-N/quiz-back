import { Prisma, Quiz } from '@prisma/client'
import { QuizzesRepository } from '../quizzes-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryQuizzesRepository implements QuizzesRepository {
  public items: Quiz[] = []

  async findManyByCategory(categorySlug: string, page: number) {
    const quizzes = this.items.filter(
      (item) => item.category_slug === categorySlug,
    )

    console.log(quizzes.slice((page - 1) * 20, page * 20))
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
      created_at: new Date(),
    }
    this.items.push(quiz)

    return quiz
  }
}
