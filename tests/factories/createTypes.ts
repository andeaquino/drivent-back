import HotelPlan from "../../src/entities/HotelPlan";
import PresenceType from "../../src/entities/PresenceType";

const createTypes = async() => {
  const hotelPlan = await HotelPlan.create({
    name: "com hotel",
    price: 100,
  }).save();

  const presenceType = await PresenceType.create({
    name: "online",
    price: 200,
  }).save();

  return {
    hotelPlan,
    presenceType
  };
};

export default createTypes;
