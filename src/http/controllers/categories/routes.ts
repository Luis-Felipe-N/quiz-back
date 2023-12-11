import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/middleware/verify-jwt.middleware'
import { search } from './search.controller'
import { create } from './create.controller'
import { category } from './category.controller'
import { remove } from './delete.controller'

export async function categoriesRouter(app: FastifyInstance) {
  app.get('/categories', search)
  app.get('/category/:categorySlug/', category)

  app.post('/category', { onRequest: [verifyJwtMiddleware] }, create)
  app.delete(
    '/category/:categorySlug',
    { onRequest: [verifyJwtMiddleware] },
    remove,
  )
}
