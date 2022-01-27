import Address from "@/entities/Address";
import Enrollment from "@/entities/Enrollment";
import Session from "@/entities/Session";
import Ticket from "@/entities/Ticket";

interface TicketInfos {
  ticket: Ticket;
  user: User;
  enrollment: Enrollment;
  session: Session;
  address: Address;
}
export default TicketInfos;
