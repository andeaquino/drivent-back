import Address from "../../src/entities/Address";
import Booking from "../../src/entities/Booking";
import Enrollment from "../../src/entities/Enrollment";
import Hotels from "../../src/entities/Hotels";
import Room from "../../src/entities/Room";
import HotelPlan from "../../src/entities/HotelPlan";
import PresenceType from "../../src/entities/PresenceType";
import RoomType from "../../src/entities/RoomType";
import Session from "../../src/entities/Session";
import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";

const clearDatabase = async() => {
  await Booking.delete({});
  await Room.delete({});
  await Hotels.delete({});
  await RoomType.delete({});
  await Ticket.delete({});
  await HotelPlan.delete({});
  await PresenceType.delete({});
  await Address.delete({});
  await Session.delete({}); 
  await Enrollment.delete({});
  await User.delete({});
};

export default clearDatabase;
