import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import clearDatabase from "../utils/clearDatabase";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";
import createEnrollment from "../factories/createEnrollment";
import Session from "../../src/entities/Session";
import { createSession, createUser } from "../factories/createUser";
import createTicket from "../factories/createTicket";

describe("POST /payment/ticket", () => {
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

  it("should return status created when ticket is saved sucessufully", async() => {
    const body = { hotelPlan: 1, presenceType: 1 };

    const result = await supertest(app).post("/payment/ticket").set("Authorization", `Bearer ${enrollment.session.token}`).send(body);
    const { status } = result;
    expect(status).toEqual(httpStatus.CREATED);
  });

  it("should return conflict when user already has a ticket", async() => {
    const body = { hotelPlan: 1, presenceType: 1 };

    const result = await supertest(app).post("/payment/ticket").set("Authorization", `Bearer ${enrollment.session.token}`).send(body);
    const { status } = result;
    expect(status).toEqual(httpStatus.CONFLICT);
  });
  
  it("Sould return unauthorized if invalid token", async() => {
    const result = await supertest(app).post("/payment/ticket").set({});
    const { status } = result;
    expect(status).toEqual(httpStatus.UNAUTHORIZED);
  });
    
  it("should return unprocessable entity for invalid body", async() => {
    const body = {};

    const result = await supertest(app).post("/payment/ticket").set("Authorization", `Bearer ${enrollment.session.token}`).send(body);
    const { status } = result;
    expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("GET /payment/ticket", () => {
  let session: Session;
  let enrollment: {
    user: User;
    enrollment: Enrollment;
    session: Session;
  };

  beforeAll(async() => {
    await init();
    const user = await createUser();
    session = await createSession(user.id);
  });

  afterEach(async() => {
    await clearDatabase();
    enrollment = await createEnrollment();
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
    const result = await supertest(app).get("/payment/ticket").set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  it("Sould return status Ok and an object if user has a ticket", async() => {
    await createTicket(enrollment.enrollment.id);

    const result = await supertest(app).get("/payment/ticket").set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual({
      id: expect.any(Number),
      hotelPlan: expect.any(Object),
      presenceType: expect.any(Object),
      enrollment: expect.any(Object),
    });
  });
});
