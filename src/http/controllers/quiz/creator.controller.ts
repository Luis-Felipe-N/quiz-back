import { makeFetchQuizzesByCategoryUseCase } from '@/use-case/factories/make-fetch-quizzes-by-category-use-case'
import { makeFetchQuizzesByCreatorUseCase } from '@/use-case/factories/make-fetch-quizzes-by-creator-use-case copy'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function creator(request: FastifyRequest, reply: FastifyReply) {
  const quizzesByCreatorParamsSchema = z.object({
    userId: z.string(),
  })

  const quizzesByCreatorQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { userId } = quizzesByCreatorParamsSchema.parse(request.params)
  const { page } = quizzesByCreatorQuerySchema.parse(request.query)

  const quizzesByCreatorUseCase = makeFetchQuizzesByCreatorUseCase()

  const { quizzes } = await quizzesByCreatorUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send({ quizzes })
}
