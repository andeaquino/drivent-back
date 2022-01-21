export default class PaymentRequired extends Error {
  constructor() {
    super("Você precisa ter confirmado o pagamento antes de fazer a escolha da hospedagem");

    this.name = "PaymentRequired";
  }
}
