import app, { init } from "../../src/app";
import supertest from "supertest";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import httpStatus from "http-status";
import CreatedEnrollment from "../utils/CreatedEnrollment";
import createEnrollment from "../factories/createEnrollment";
import createBooking from "../factories/createBooking";
import Session from "../../src/entities/Session";
import { createAlternativeUser, createSession, createUser } from "../factories/createUser";
import createActivity from "../factories/createActivity";
import createTicket from "../factories/createTicket";

describe("GET /activities", () => {
  let enrollment: CreatedEnrollment;
  let session: Session;
  let activity;

  beforeAll(async() => {
    await init();
    await clearDatabase();
    const user = await createAlternativeUser();
    session = await createSession(user.id);
    enrollment = await createEnrollment();
    activity = await createActivity();
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

  it("Sould return status Ok and an object for valid token, enrolled user with ticket and hotel", async() => {
    const hotel = await createBooking();
    const result = await supertest(app).get("/activities").set("Authorization", `Bearer ${hotel}`);
    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      startTime: expect.any(String),
      endTime: expect.any(String),
      vacancies: expect.any(String),
      day: expect.any(Object),
      stage: expect.any(Object),
    });
  });

  it("Sould return status Unauthorized for invalid token", async() => {
    const result = await supertest(app).get("/activities").set({});
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("Sould return return payment required for a user without ticket", async() => {
    const result = await supertest(app)
      .get("/activities")
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(httpStatus.PAYMENT_REQUIRED);
  });

  it("Sould return return precondition failed for a user that did not choose a hotel", async() => {
    const ticket = await createTicket();
    const result = await supertest(app)
      .get("/activities")
      .set("Authorization", `Bearer ${ticket.session.token}`);
    expect(result.status).toEqual(httpStatus.PRECONDITION_FAILED);
  });
});
