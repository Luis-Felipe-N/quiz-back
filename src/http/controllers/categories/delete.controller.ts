import { makeDeleteCategoryUseCase } from '@/use-case/factories/make-delete-category-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteCategoryParamsSchema = z.object({
    categorySlug: z.string(),
  })

  const { categorySlug } = deleteCategoryParamsSchema.parse(request.params)

  const deleteCategoryUseCase = makeDeleteCategoryUseCase()
  await deleteCategoryUseCase.execute({
    categorySlug,
  })

  return reply.status(200).send()
}
