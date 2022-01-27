export default class NotFoundError extends Error {
  constructor() {
    super("Sem resultados para essa pesquisa!");

    this.name = "NotFoundError";
  }
}
