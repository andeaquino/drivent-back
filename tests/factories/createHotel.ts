import Hotels from "../../src/entities/Hotels";

export async function createHotel() {
  const hotel = await Hotels.create({
    name: "hotelTest",
    img: "https://www.npmjs.com/package/supertest",
  }).save();

  return hotel;
}
