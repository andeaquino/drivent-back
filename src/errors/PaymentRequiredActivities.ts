export default class PaymentRequiredActivities extends Error {
  constructor() {
    super("Você precisa ter confirmado pagamento antes de fazer a escolha de atividades");

    this.name = "PaymentRequired";
  }
}
