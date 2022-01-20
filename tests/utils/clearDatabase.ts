import Address from "../../src/entities/Address";
import Booking from "../../src/entities/Booking";
import Enrollment from "../../src/entities/Enrollment";
import HotelPlan from "../../src/entities/HotelPlan";
import Hotels from "../../src/entities/Hotels";
import PresenceType from "../../src/entities/PresenceType";
import Room from "../../src/entities/Room";
import RoomType from "../../src/entities/RoomType";
import Session from "../../src/entities/Session";
import Setting from "../../src/entities/Setting";
import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";

const clearDatabase = async() => {
  await Booking.clear();
  await Room.clear();
  await Hotels.clear();
  await RoomType.clear();
  await Ticket.clear();
  await HotelPlan.clear();
  await PresenceType.clear();
  await Enrollment.clear();
  await Session.clear();
  await User.clear();
  await Address.clear();
  await Setting.clear();
};

export default clearDatabase;
