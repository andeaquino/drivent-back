import Ticket from "../../src/entities/Ticket";
import CreatedEnrollment from "./CreatedEnrollment";

interface CreatedTicket extends CreatedEnrollment {
    ticket: Ticket,
}

export default CreatedTicket;
