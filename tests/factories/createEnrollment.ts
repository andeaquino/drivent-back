import Address from "../../src/entities/Address";
import Enrollment from "../../src/entities/Enrollment";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";

const createEnrollment = async() => {
  const user = await User.createNew("oi@uol.com", "123456");
  const session = await Session.create().save();
  const address = await Address.create().save();
  const enrollment = await Enrollment.create().save();

  console.log({
    enrollment,
    session,
    user,
    address,
  });
  
  return {
    enrollment,
    session,
    user,
    address,
  };
};

export default createEnrollment;
