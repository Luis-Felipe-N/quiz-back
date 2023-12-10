import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/memory/in-memory-categories-repository'
import { DeleteCategoryUseCase } from './delete-category.usecase'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: DeleteCategoryUseCase

describe('Delete Category Quiz Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new DeleteCategoryUseCase(categoriesRepository)
  })

  it('should be able to fetch questions by quiz', async () => {
    const categoryCreated = await categoriesRepository.create({
      slug: 'espaco-sideral',
      title: 'Espaço sideral',
      description:
        'Bem-vindo ao "Explorando o Cosmos", um quiz fascinante que testará seus conhecimentos sobre o vasto e misterioso espaço sideral! Prepare-se para uma jornada emocionante através das estrelas, planetas, galáxias e além.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })
    await sut.execute({ categorySlug: categoryCreated.slug })

    const category = await categoriesRepository.findBySlug(categoryCreated.slug)
    expect(category).toBe(null)
  })
})
