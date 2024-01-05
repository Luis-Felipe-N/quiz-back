import { InMemoryQuizzesRepository } from '@/repositories/memory/in-memory-quizzes-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchQuizzesByCreatorUseCase } from './fetch-quizzes-by-creator.usecase'

let quizzesRepository: InMemoryQuizzesRepository
let sut: FetchQuizzesByCreatorUseCase

describe('Fetch Quizzes By Creator Use Case', () => {
  beforeEach(() => {
    quizzesRepository = new InMemoryQuizzesRepository()
    sut = new FetchQuizzesByCreatorUseCase(quizzesRepository)
  })

  it('should be able to fetch quizzes by creator', async () => {
    await quizzesRepository.create({
      title: 'Galáxias-01',
      description:
        'Prepare-se para uma jornada emocionante pelo cosmos enquanto testa seus conhecimentos sobre galáxias neste incrível quiz.',
      cover: null,
      color: '#000000',
      creator_id: 'user-creator',
      category_slug: 'categoria-slug-01',
    })

    await quizzesRepository.create({
      title: 'Galáxias-02',
      description:
        'Prepare-se para uma jornada emocionante pelo cosmos enquanto testa seus conhecimentos sobre galáxias neste incrível quiz.',
      cover: null,
      color: '#000000',
      creator_id: 'user-creator-02',
      category_slug: 'categoria-slug-02',
    })

    const { quizzes } = await sut.execute({
      userId: 'user-creator',
      page: 1,
    })

    expect(quizzes).toHaveLength(1)
    expect(quizzes).toEqual([expect.objectContaining({ title: 'Galáxias-01' })])
  })
})
