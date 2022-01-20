export default class PreconditionFailed extends Error {
  constructor() {
    super("Your ticket type does not include hosting!");

    this.name = "PreconditionFailed";
  }
}
