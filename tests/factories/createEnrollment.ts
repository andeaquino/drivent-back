import Address from "../../src/entities/Address";
import Enrollment from "../../src/entities/Enrollment";
import { createSession, createUser } from "./createUser";

const createEnrollment = async() => {
  const user = await createUser();
  const session = await createSession(user.id);
  const enrollment = await Enrollment.create({
    name: "pedrin",
    cpf: "186.272.727-25",
    phone: "(21) 98787-8787", 
    birthday: "14/02/2001",
    userId: user.id,
  }).save();

  const address = await Address.create({
    cep: "26011-680",
    city: "Nova Iguaçu",
    street: "Rua Milton Campos",
    state: "RJ",
    neighborhood: "Cruzeiro do Sul",
    number: "87",
    addressDetail: "",
    enrollmentId: enrollment.id,
  }).save();

  return {
    user,
    enrollment,
    session,
    address,
  };
};

export default createEnrollment;
