import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from './create-category.use-case'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should be able to create category', async () => {
    const { category } = await sut.execute({
      title: 'Espaço sideral',
      description:
        'Bem-vindo ao "Explorando o Cosmos", um quiz fascinante que testará seus conhecimentos sobre o vasto e misterioso espaço sideral! Prepare-se para uma jornada emocionante através das estrelas, planetas, galáxias e além.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })
    expect(category.slug).toEqual(expect.any(String))
  })
})
