import Stage from "../../src/entities/Stage";

export async function createStage() {
  const stage = await Stage.create({
    name: "Auditório Lateral",
  }).save();
  return stage;
}
