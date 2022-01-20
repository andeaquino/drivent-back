export default class PaymentRequired extends Error {
  constructor() {
    super("You must complete the payment to access this page!");

    this.name = "PaymentRequired";
  }
}
