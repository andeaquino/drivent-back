export default class CannotPayBeforeEnrollmentError extends Error {
  constructor() {
    super("Cannot access payment without completing your enrollment!");
  
    this.name = "CannotPayBeforeEnrollmentError";
  }
}
