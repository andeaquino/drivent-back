import Room from "../../src/entities/Room";
import { createRoomType } from "./createRoomType";
import { createHotel } from "./createHotel";

export async function createRoom() {
  const hotel = await createHotel();
  const roomType = await createRoomType();

  const room = await Room.create({
    name: "test",
    hotel: hotel,
    type: roomType,
  }).save();
  return room;
}
