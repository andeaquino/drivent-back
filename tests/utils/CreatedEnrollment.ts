import Address from "../../src/entities/Address";
import Enrollment from "../../src/entities/Enrollment";
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

interface CreatedEnrollment {
  enrollment: Enrollment,
  session: Session,
  user: User,
  address: Address,
}

export default CreatedEnrollment;
