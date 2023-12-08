import { InMemoryCategoriesRepository } from '@/repositories/memory/in-memory-categories-repository'
import { GetCategoryUseCase } from './get-category.usecase'
import { beforeEach, describe, expect, it } from 'vitest'
import slugify from 'slugify'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: GetCategoryUseCase

describe('Get Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetCategoryUseCase(categoriesRepository)
  })

  it('should be able to get category', async () => {
    const createdCategory = await categoriesRepository.create({
      slug: slugify('Espaço sideral', { lower: true }),
      title: 'Espaço sideral',
      description:
        'Bem-vindo ao "Explorando o Cosmos", um quiz fascinante que testará seus conhecimentos sobre o vasto e misterioso espaço sideral! Prepare-se para uma jornada emocionante através das estrelas, planetas, galáxias e além.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })

    const { category } = await sut.execute({
      categorySlug: createdCategory.slug,
    })

    expect(category.title).toBe('Espaço sideral')
  })

  it('should not be able to get category with wrong slug', async () => {
    await expect(
      sut.execute({ categorySlug: 'non-exists-slug' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
