export default class CannotEnrollBeforeStartDateError extends Error {
  constructor() {
    super("Não pode se inscrever antes da data de início do evento!");

    this.name = "CannotEnrollBeforeStartDateError";
  }
}
