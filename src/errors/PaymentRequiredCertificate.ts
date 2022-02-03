export default class PaymentRequiredCertificate extends Error {
  constructor() {
    super("Você precisa ter confirmado pagamento para ter um certificado");

    this.name = "CertificateRequired";
  }
}
