import { makeGetCategoryUseCase } from '@/use-case/factories/make-get-category-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function category(request: FastifyRequest, reply: FastifyReply) {
  const getCategoryParamsSchema = z.object({
    categorySlug: z.string(),
  })

  const { categorySlug } = getCategoryParamsSchema.parse(request.params)

  const getCategoryUseCase = makeGetCategoryUseCase()
  const { category } = await getCategoryUseCase.execute({
    categorySlug,
  })

  return reply.status(200).send({
    category,
  })
}
