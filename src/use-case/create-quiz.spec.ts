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
      title: 'Galáxias',
      description:
        'Prepare-se para uma jornada emocionante pelo cosmos enquanto testa seus conhecimentos sobre galáxias neste incrível quiz.',
      cover: null,
      color: '#000000',
      creatorId: 'user-creator',
      categorySlug: 'categoria-slug',
    })

    expect(quiz.title).toEqual(expect.any(String))
  })
})
