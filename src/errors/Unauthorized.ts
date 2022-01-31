export default class UnauthorizedError extends Error {
  constructor() {
    super("Erro na autenticação do usuário");

    this.name = "UnauthorizedError";
  }
}
