import { makeCreateCategoryUseCase } from '@/use-case/factories/make-create-category-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCategoryBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    color: z.string(),
  })

  const { title, description, cover, color } = createCategoryBodySchema.parse(
    request.body,
  )

  const createCategoryUseCase = makeCreateCategoryUseCase()
  await createCategoryUseCase.execute({
    title,
    description,
    cover,
    color,
  })

  return reply.status(201).send()
}
