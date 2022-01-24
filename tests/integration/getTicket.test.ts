import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";
import app, { init } from "../../src/app";
import clearDatabase from "../utils/clearDatabase";
import createEnrollment from "../factories/createEnrollment";
import Session from "../../src/entities/Session";
import { createSession, createUser } from "../factories/createUser";
import createTicket from "../factories/createTicket";

describe("GET /payment/ticket", () => {
  let session: Session;

  beforeAll(async() => {
    await init();
    const user = await createUser();
    session = await createSession(user.id);
  });

  afterEach(async() => {
    await clearDatabase();
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });

  it("Sould return forbidden if not enrolled user", async() => {
    const result = await supertest(app).get("/payment/ticket").set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(httpStatus.FORBIDDEN);
  });
  
  it("Sould return unauthorized if invalid token", async() => {
    const result = await supertest(app).get("/payment/ticket").set({});
    const { status } = result;
    expect(status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("Sould return not found if user doesn't have a ticket", async() => {
    const enrollment = await createEnrollment();
    const result = await supertest(app).get("/payment/ticket").set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  it("Sould return status Ok and an object if user has a ticket", async() => {
    const ticket = await createTicket();
    const result = await supertest(app).get("/payment/ticket").set("Authorization", `Bearer ${ticket.session.token}`);
    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual({
      id: expect.any(Number),
      hotelPlan: expect.any(Object),
      presenceType: expect.any(Object),
      enrollment: expect.any(Object),
    });
  });
});
