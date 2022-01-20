import HotelPlan from "@/entities/HotelPlan";
import PresenceType from "@/entities/PresenceType";

export async function getAllPlans() {
  const hotelPlans =  await HotelPlan.getAll();
  const presenceTypes = await PresenceType.getAll();
  
  return {
    hotelPlans: [...hotelPlans],
    presenceTypes: [...presenceTypes]
  };
}
