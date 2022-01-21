export default class PreconditionFailed extends Error {
  constructor() {
    super(
      "Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades"
    );

    this.name = "PreconditionFailed";
  }
}
