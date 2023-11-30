import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuizzesRepository } from '@/repositories/memory/in-memory-quizzes-repository'
import { CreateQuizUseCase } from './create-quiz.usecase'

let quizzesRepository: InMemoryQuizzesRepository
let sut: CreateQuizUseCase

describe('Create Quiz Use Case', () => {
  beforeEach(() => {
    quizzesRepository = new InMemoryQuizzesRepository()
    sut = new CreateQuizUseCase(quizzesRepository)
  })

  it('should be able to create quiz', async () => {
    const { quiz } = await sut.execute({
      title: 'Academia do Ty',
      description: '',
      cover: null,
      color: null,
      categorySlug: 'categoria-slug',
    })

    expect(quiz.title).toEqual(expect.any(String))
  })
})
