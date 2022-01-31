export default class UnauthorizedError extends Error {
  constructor() {
    super("Você deve estar logado para continuar!");

    this.name = "UnauthorizedError";
  }
}
