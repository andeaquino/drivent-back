import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import supertest from "supertest";
import createEnrollment from "../factories/createEnrollment";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";

describe ("GET /payment/plans", () => {
  let enrollment: {
    user: User;
    enrollment: Enrollment;
  };

  beforeAll(async() => {
    await init();
    await clearDatabase();
    enrollment = await createEnrollment();
  });

  it("Sould return an object's array and status 200 if there is data on the database", async() => {
    const result = await supertest(app).post("/sign-in").send(enrollment.user);
    expect(result.status).toEqual(200);
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });
});
