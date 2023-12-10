import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/middleware/verify-jwt.middleware'
import { search } from './search.controller'
import { create } from './create.controller'
import { category } from './category.controller'
import { remove } from './delete.controller'

export async function categoriesRouter(app: FastifyInstance) {
  app.get('/categories', search)
  app.get('/categories/:categorySlug/', category)

  app.post('/categories', { onRequest: [verifyJwtMiddleware] }, create)
  app.delete(
    '/categories/:categorySlug',
    { onRequest: [verifyJwtMiddleware] },
    remove,
  )
}
