import { InMemoryCategoriesRepository } from '@/repositories/memory/in-memory-categories-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchCategoriesUseCase } from './search-categories.use-case'

let categoriesRepository: InMemoryCategoriesRepository
let sut: SearchCategoriesUseCase

describe('Search Categories Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new SearchCategoriesUseCase(categoriesRepository)
  })

  it('should be able to search categories without query', async () => {
    await categoriesRepository.create({
      slug: '',
      title: 'Espaço',
      description:
        'Bem-vindo ao "Explorando o Cosmos", um quiz fascinante que testará seus conhecimentos sobre o vasto e misterioso espaço sideral! Prepare-se para uma jornada emocionante através das estrelas, planetas, galáxias e além.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })

    await categoriesRepository.create({
      slug: '',
      title: 'Geografia',
      description:
        'Teste seus conhecimentos sobre a localização de países, capitais e oceanos ao redor do mundo.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })

    const { categories } = await sut.execute({ query: 'geografia', page: 1 })

    expect(categories).toHaveLength(1)
    expect(categories).toEqual([
      expect.objectContaining({ title: 'Geografia' }),
    ])
  })

  it('should be able to search categories without query', async () => {
    await categoriesRepository.create({
      slug: '',
      title: 'Espaço',
      description:
        'Bem-vindo ao "Explorando o Cosmos", um quiz fascinante que testará seus conhecimentos sobre o vasto e misterioso espaço sideral! Prepare-se para uma jornada emocionante através das estrelas, planetas, galáxias e além.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })

    await categoriesRepository.create({
      slug: '',
      title: 'Geografia',
      description:
        'Teste seus conhecimentos sobre a localização de países, capitais e oceanos ao redor do mundo.',
      color: '#0000000',
      cover:
        'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg',
    })

    const { categories } = await sut.execute({ query: '', page: 1 })

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      expect.objectContaining({ title: 'Espaço' }),
      expect.objectContaining({ title: 'Geografia' }),
    ])
  })
})
