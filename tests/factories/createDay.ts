import Day from "../../src/entities/Day";

export async function createDay() {
  const day = await Day.create({
    name: "Sábado, 22/10",
  }).save();
  return day;
}
