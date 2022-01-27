import RoomType from "../../src/entities/RoomType";

export async function createRoomType() {
  const roomType = await RoomType.create({
    name: "test",
    vacancies: 3,
  }).save();

  return roomType;
}
