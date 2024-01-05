import { makeFetchQuizzesByCategoryUseCase } from '@/use-case/factories/make-fetch-quizzes-by-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function category(request: FastifyRequest, reply: FastifyReply) {
  const quizzesByCategoryParamsSchema = z.object({
    categorySlug: z.string(),
  })

  const quizzesByCategoryQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { categorySlug } = quizzesByCategoryParamsSchema.parse(request.params)
  const { page } = quizzesByCategoryQuerySchema.parse(request.query)

  const quizzesByCategoryUseCase = makeFetchQuizzesByCategoryUseCase()

  const { quizzes } = await quizzesByCategoryUseCase.execute({
    categorySlug,
    page,
  })

  return reply.status(200).send({ quizzes })
}
