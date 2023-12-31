import { InMemoryQuizzesRepository } from '@/repositories/memory/in-memory-quizzes-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchQuizzesByCategoryUseCase } from './fetch-quizzes-by-category.usecase'

let quizzesRepository: InMemoryQuizzesRepository
let sut: FetchQuizzesByCategoryUseCase

describe('Fetch Quizzes By Category Use Case', () => {
  beforeEach(() => {
    quizzesRepository = new InMemoryQuizzesRepository()
    sut = new FetchQuizzesByCategoryUseCase(quizzesRepository)
  })

  it('should be able to fetch quizzes by category', async () => {
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
      creator_id: 'user-creator',
      category_slug: 'categoria-slug-02',
    })

    const { quizzes } = await sut.execute({
      categorySlug: 'categoria-slug-01',
      page: 1,
    })

    expect(quizzes).toHaveLength(1)
    expect(quizzes).toEqual([expect.objectContaining({ title: 'Galáxias-01' })])
  })
})
