import { InMemoryQuestionsRepository } from '@/repositories/memory/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuizzesRepository } from '@/repositories/memory/in-memory-quizzes-repository'
import { FetchQuestionsByQuizUseCase } from './fetch-questions-by-quiz.usecase'

let questionsRepository: InMemoryQuestionsRepository
let quizzesRepository: InMemoryQuizzesRepository
let sut: FetchQuestionsByQuizUseCase

describe('Fetch Questions By Quiz Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    quizzesRepository = new InMemoryQuizzesRepository()
    sut = new FetchQuestionsByQuizUseCase(questionsRepository)
  })

  it('should be able to fetch questions by quiz', async () => {
    const quiz = await quizzesRepository.create({
      title: 'Galáxias',
      description:
        'Prepare-se para uma jornada emocionante pelo cosmos enquanto testa seus conhecimentos sobre galáxias neste incrível quiz.',
      cover: null,
      color: '#000000',
      creator_id: 'user-creator',
      category_slug: 'categoria-slug',
    })
    await questionsRepository.create({
      content: 'Quantas galáxias estima-se que existam no universo observável?',
      quiz_id: quiz.id,
    })

    await questionsRepository.create({
      content: 'O que é uma galáxia?',
      quiz_id: quiz.id,
    })

    await questionsRepository.create({
      content: 'Qual é a galáxia mais próxima da Via Láctea?',
      quiz_id: 'quiz-inexistente',
    })

    const { questions } = await sut.execute({
      quizId: quiz.id,
    })

    expect(questions).toHaveLength(2)
    expect(questions).toEqual([
      expect.objectContaining({
        content:
          'Quantas galáxias estima-se que existam no universo observável?',
      }),
      expect.objectContaining({
        content: 'O que é uma galáxia?',
      }),
    ])
  })
})
