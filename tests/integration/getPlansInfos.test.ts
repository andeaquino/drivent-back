import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import supertest from "supertest";
import createEnrollment from "../factories/createEnrollment";
import Session from "../../src/entities/Session";
import http from "../../src/enums/http.status";
import { createSession, createUser } from "../factories/createUser";
import CreatedEnrollment from "../utils/CreatedEnrollment";

describe ("GET /payment/plans", () => {
  let session: Session;
  let enrollment: CreatedEnrollment;

  beforeAll(async() => {
    await init();
    await clearDatabase();
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

  it("Should return status Ok and an object if valid token and enrolled user", async() => {
    const result = await supertest(app).get("/payment/plans").set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(http.OK);
    expect(result.body).toEqual({
      hotelPlans: expect.any(Array),
      presenceTypes: expect.any(Array),
    });
  });

  it("Should return unauthorized if invalid token", async() => {
    const result = await supertest(app).get("/payment/plans").set({});
    expect(result.status).toEqual(http.UNAUTHORIZED);
  });

  it("Should return forbidden if not enrolled user", async() => {
    const result = await supertest(app).get("/payment/plans").set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(http.FORBIDDEN);
  });
});
