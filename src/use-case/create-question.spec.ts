import { beforeEach, describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question.usecase'
import { InMemoryQuizzesRepository } from '@/repositories/memory/in-memory-quizzes-repository'
import { InMemoryQuestionsRepository } from '@/repositories/memory/in-memory-questions-repository'
import { MaxResourceError } from './errors/max-resource-error'

let questionsRepository: InMemoryQuestionsRepository
let quizzesRepository: InMemoryQuizzesRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    quizzesRepository = new InMemoryQuizzesRepository()
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create question', async () => {
    const quiz = await quizzesRepository.create({
      title: 'Galáxias',
      description:
        'Prepare-se para uma jornada emocionante pelo cosmos enquanto testa seus conhecimentos sobre galáxias neste incrível quiz.',
      cover: null,
      color: '#000000',
      creator_id: 'user-creator',
      category_slug: 'categoria-slug',
    })

    const { question } = await sut.execute({
      content: 'Quantas galáxias estima-se que existam no universo observável?',
      quizId: quiz.id,
    })

    expect(question.id).toEqual(expect.any(String))
  })

  it('should not be able to create than 5 question in the same quiz', async () => {
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
      content: 'O que é uma galáxia?',
      quiz_id: quiz.id,
    })

    await questionsRepository.create({
      content: 'Quantas galáxias estima-se que existam no universo observável?',
      quiz_id: quiz.id,
    })

    await questionsRepository.create({
      content: 'Qual é a galáxia mais próxima da Via Láctea?',
      quiz_id: quiz.id,
    })

    await questionsRepository.create({
      content: 'Que tipo de galáxia tem uma forma elíptica?',
      quiz_id: quiz.id,
    })

    await questionsRepository.create({
      content:
        'Qual é o nome do buraco negro supermassivo no centro da Via Láctea?',
      quiz_id: quiz.id,
    })

    await expect(
      sut.execute({
        content:
          'Quantas galáxias estima-se que existam no universo observável?',
        quizId: quiz.id,
      }),
    ).rejects.toBeInstanceOf(MaxResourceError)
  })
})
