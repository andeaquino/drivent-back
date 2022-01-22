import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import supertest from "supertest";
import createEnrollment from "../factories/createEnrollment";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";
import Session from "../../src/entities/Session";
import httpStatus from "http-status";
import { createSession, createUser } from "../factories/createUser";

describe ("GET /payment/plans", () => {
  let session: Session;
  let enrollment: {
    user: User;
    enrollment: Enrollment;
    session: Session;
  };

  beforeAll(async() => {
    await init();
    enrollment = await createEnrollment();
  });

  afterEach(async() => {
    await clearDatabase();
    const user = await createUser();
    session = await createSession(user.id);
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });

  it("Sould return status Ok and an object if valid token and enrolled user", async() => {
    const result = await supertest(app).get("/payment/plans").set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual({
      hotelPlans: expect.any(Array),
      presenceTypes: expect.any(Array),
    });
  });

  it("Sould return unauthorized if invalid token", async() => {
    const result = await supertest(app).get("/payment/plans").set({});
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("Sould return forbidden if not enrolled user", async() => {
    const result = await supertest(app).get("/payment/plans").set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(httpStatus.FORBIDDEN);
  });
});
