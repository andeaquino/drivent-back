import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import clearDatabase from "../utils/clearDatabase";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";
import createEnrollment from "../factories/createEnrollment";
import Session from "../../src/entities/Session";

beforeAll(async() => {
  await init();
});

beforeEach(async() => {
  await clearDatabase();
});

afterAll(async() => {
  await getConnection().close();
});

describe("POST /payment/ticket", () => {
  let enrollment: {
    user: User;
    enrollment: Enrollment;
    session: Session;
  };

  beforeAll(async() => {
    enrollment = await createEnrollment();
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
