import Session from "../../src/entities/Session";
import Address from "../../src/entities/Address";
import Enrollment from "../../src/entities/Enrollment";
import User from "../../src/entities/User";

const createEnrollment = async() => {
  const user = await User.createNew("oi@uol.com", "123456");
  const session = await Session.create({ userId: user.id, token: "token" }).save();
  const enrollment = await Enrollment.create({
    name: "pedrin",
    cpf: "18627272724",
    phone: "21987878787", 
    birthday: "14/02/2001",
    userId: user.id,
  }).save();

  const address = await Address.create({
    cep: "26011680",
    city: "Nova Iguaçu",
    street: "Rua Milton Campos",
    state: "RJ",
    neighborhood: "Cruzeiro do Sul",
    number: "87",
    addressDetail: "",
    enrollmentId: 2,
  }).save();

  console.log({
    user,
    session,
    address,
    enrollment,
  });
  
  return {
    user,
    enrollment,
    session,
    address,
  };
};

export default createEnrollment;
