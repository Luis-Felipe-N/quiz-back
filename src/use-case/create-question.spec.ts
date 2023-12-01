import { beforeEach, describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question.use-case'
import { InMemoryQuestionRepository } from '@/repositories/memory/in-memory-questions-repository'
import { InMemoryQuizzesRepository } from '@/repositories/memory/in-memory-quizzes-repository'

let questionsRepository: InMemoryQuestionRepository
let quizzesRepository: InMemoryQuizzesRepository
let sut: CreateQuestionUseCase

describe('Create Quiz Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionRepository()
    quizzesRepository = new InMemoryQuizzesRepository()
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create quiz', async () => {
    const quiz = await quizzesRepository.create({
      title: 'Galáxias',
      description:
        'Prepare-se para uma jornada emocionante pelo cosmos enquanto testa seus conhecimentos sobre galáxias neste incrível quiz.',
      cover: null,
      color: '#000000',
      category_slug: 'categoria-slug',
    })

    console.log(quiz.id)

    const { question } = await sut.execute({
      content: 'Quantas galáxias estima-se que existam no universo observável?',
      quizId: quiz.id,
    })

    expect(question.id).toEqual(expect.any(String))
  })
})
