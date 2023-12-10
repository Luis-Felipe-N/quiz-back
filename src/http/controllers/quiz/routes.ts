import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/middleware/verify-jwt.middleware'
import { create } from './create.controller'
import { quizzesByCategory } from './quizzes.controller'

export async function quizzesRoutes(app: FastifyInstance) {
  app.get('/category/:categorySlug/quizzes', quizzesByCategory)

  /** AUTHENTICATED */
  app.post(
    '/category/:categorySlug/quiz',
    { onRequest: [verifyJwtMiddleware] },
    create,
  )
}
