import Activity from "../../src/entities/Activity";
import { createDay } from "./createDay";
import { createStage } from "./createStage";

const createActivity = async() => {
  const day = await createDay();
  const stage = await createStage();

  const activity = await Activity.create({
    name: "Lol",
    startTime: "9:00",
    endTime: "10:00",
    vacancies: 30,
    day: day,
    stage: stage,
  }).save();

  return { activity };
};

export default createActivity;
