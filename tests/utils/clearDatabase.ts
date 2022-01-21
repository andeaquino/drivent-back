import Address from "../../src/entities/Address";
import Booking from "../../src/entities/Booking";
import Enrollment from "../../src/entities/Enrollment";
import HotelPlan from "../../src/entities/HotelPlan";
import Hotels from "../../src/entities/Hotels";
import PresenceType from "../../src/entities/PresenceType";
import Room from "../../src/entities/Room";
import RoomType from "../../src/entities/RoomType";
import Session from "../../src/entities/Session";
import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";

const clearDatabase = async() => {
  await Room.delete({});
  await Hotels.delete({});
  await RoomType.delete({});
  await HotelPlan.delete({});
  await PresenceType.delete({});
  await Booking.delete({});
  await Ticket.delete({});
  await Address.delete({});
  await Session.delete({}); 
  await Enrollment.delete({});
  await User.delete({});
};

export default clearDatabase; 
