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

const createRows = async() => {
  const booking = Booking.create();
  const enrollment = Enrollment.create();
  const hotelPlan = HotelPlan.create();
  const hotel = Hotels.create();
  const presenceType = PresenceType.create();
  const room = Room.create();
  const roomType = RoomType.create();
  const session = Session.create();
  const setting = Setting.create();
  const ticket = Ticket.create();
  const user = await User.createNew("oi@uol.com", "123456");
  const address = Address.create();

  return {
    booking,
    enrollment,
    hotelPlan,
    hotel,
    presenceType,
    room,
    roomType,
    session,
    setting,
    ticket,
    user,
    address,
  };
};

export default createRows;
