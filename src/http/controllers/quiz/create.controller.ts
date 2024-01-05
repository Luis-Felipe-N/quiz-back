import { makeCreateQuizUseCase } from '@/use-case/factories/make-create-quiz-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createQuizParamsSchema = z.object({
    categorySlug: z.string(),
  })

  const createQuizBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string().nullable(),
    color: z.string().nullable(),
    creatorId: z.string(),
  })

  const { title, description, color, cover, creatorId } =
    createQuizBodySchema.parse(request.body)

  const { categorySlug } = createQuizParamsSchema.parse(request.params)

  const createQuizUseCase = makeCreateQuizUseCase()
  await createQuizUseCase.execute({
    title,
    description,
    color,
    cover,
    categorySlug,
    creatorId,
  })

  return reply.status(201).send()
}
