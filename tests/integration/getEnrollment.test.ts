import app, { init } from "../../src/app";
import supertest from "supertest";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import httpStatus from "http-status";
import CreatedEnrollment from "../utils/CreatedEnrollment";
import createEnrollment from "../factories/createEnrollment";
import Session from "../../src/entities/Session";
import { createAlternativeUser, createSession, createUser } from "../factories/createUser";

describe ("GET /enrollments", () => {
  let enrollment: CreatedEnrollment;
  let session: Session;  

  beforeAll(async() => {
    await init();
    await clearDatabase();
    const user = await createAlternativeUser();
    session = await createSession(user.id);
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
    const result = await supertest(app).get("/enrollments").set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual({
      id: expect.any(Number),
      cpf: expect.any(String),
      name: expect.any(String),
      phone: expect.any(String),
      birthday: expect.any(String),
      userId: expect.any(Number),
      address: expect.any(Object)
    });
  });

  it("Sould return status Unauthorized if invalid token", async() => {
    const result = await supertest(app).get("/enrollments").set({});
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("Sould return return no content if not enrolled user", async() => {
    const result = await supertest(app).get("/enrollments").set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(httpStatus.NO_CONTENT);
  });
});
