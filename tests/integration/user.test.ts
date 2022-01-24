import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { createUser, generateUserBody } from "../factories/createUser";
import clearDatabase from "../utils/clearDatabase";

beforeAll(async() => {
  await init();
});

beforeEach(async() => {
  await clearDatabase();
});

afterAll(async() => {
  await getConnection().close();
});

describe("POST /users", () => {
  it("should return unprocessable entity for invalid body", async() => {
    const body = {};

    const result = await supertest(app).post("/users").send(body);
    const { status } = result;
    expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return status created when account is created sucessufully", async() => {
    const body = generateUserBody();

    const result = await supertest(app).post("/users").send(body);
    const { status } = result;
    expect(status).toEqual(httpStatus.CREATED);
  });

  it("should return conflict when email is already in use", async() => {
    await createUser();
    const user = generateUserBody();

    const result = await supertest(app).post("/users").send(user);
    const { status } = result;
    expect(status).toEqual(httpStatus.CONFLICT);
  });
});

describe("POST /auth/sign-in", () => {
  it("should return unprocessable entity for invalid body", async() => {
    const body = {};

    const result = await supertest(app).post("/auth/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return status OK when account is logged in sucessufully", async() => {
    await createUser();
    const user = generateUserBody();

    const result = await supertest(app).post("/auth/sign-in").send(user);
    const status = result.status;
    expect(status).toEqual(httpStatus.OK);
  });

  it("should return unauthorized when email or password does not match or exist", async() => {
    const user = generateUserBody();
    const body = { email: user.email, password: user.password };

    const result = await supertest(app).post("/auth/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(httpStatus.UNAUTHORIZED);
  });
});

