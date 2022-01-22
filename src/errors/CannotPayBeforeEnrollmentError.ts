export default class CannotPayBeforeEnrollmentError extends Error {
  constructor() {
    super("Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso!");
  
    this.name = "CannotPayBeforeEnrollmentError";
  }
}
