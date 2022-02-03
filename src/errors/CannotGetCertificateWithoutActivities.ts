export default class CannotGetCertificateWithoutActivities extends Error {
  constructor() {
    super("Você precisa selecionado as atividades para ter seu certificado!");

    this.name = "CannotGetCertificateWithoutActivities";
  }
}
