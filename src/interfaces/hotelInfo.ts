import RoomsInfo from "./roomsInfo";

interface HotelInfo {
  id: number;
  name: string;
  img: string;
  totalVacancy: number;
  availableTypes: string[];
  rooms: RoomsInfo[];
}

export default HotelInfo;
