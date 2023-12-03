export class MaxResourceError extends Error {
  constructor() {
    super('Max resource reached.')
  }
}
