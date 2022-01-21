import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import supertest from "supertest";
import createEnrollment from "../factories/createEnrollment";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";
import Session from "../../src/entities/Session";

describe ("GET /payment/plans", () => {
  let enrollment: {
    user: User;
    enrollment: Enrollment;
    session: Session;
  };

  beforeAll(async() => {
    await init();
    await clearDatabase();
    enrollment = await createEnrollment();
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });

  it("Sould return status 401 if invalid token", async() => {
    const result = await supertest(app).post("/payment/plans").send(enrollment.user).set({});
    expect(result.status).toEqual(401);
  });
});
