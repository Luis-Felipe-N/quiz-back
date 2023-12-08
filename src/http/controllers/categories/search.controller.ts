import { makeSearchCategoriesUseCase } from '@/use-case/factories/make-search-categories-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchCategoriesQuerySchema = z.object({
    q: z.string().default(''),
    page: z.number().min(1).default(1),
  })

  const { page, q } = searchCategoriesQuerySchema.parse(request.query)

  const searchCategoriesUseCase = makeSearchCategoriesUseCase()

  const { categories } = await searchCategoriesUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ categories })
}
