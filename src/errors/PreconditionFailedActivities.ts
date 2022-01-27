export default class PreconditionFailedActivities extends Error {
  constructor() {
    super(
      "Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."
    );

    this.name = "PreconditionFailed";
  }
}
