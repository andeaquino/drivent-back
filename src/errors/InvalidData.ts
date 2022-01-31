export default class InvalidDataError extends Error {
  details: string[];

  constructor(name: string, details: string[]) {
    super(`Campo inválido: ${name}`);

    this.details = details;
    this.name = "InvalidDataError";
  }
}
