export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super('Category with slug already exits')
  }
}
