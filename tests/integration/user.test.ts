import supertest from "supertest";
import { getConnection } from "typeorm";

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
  it("should return status 422 for invalid body", async() => {
    const body = {};

    const result = await supertest(app).post("/users").send(body);
    const { status } = result;
    expect(status).toEqual(422);
  });

  it("should return status 201 when account is created sucessufully", async() => {
    const body = generateUserBody();

    const result = await supertest(app).post("/users").send(body);
    const { status } = result;
    expect(status).toEqual(201);
  });

  it("should return status 409 when email is already in use", async() => {
    await createUser();
    const user = generateUserBody();

    const result = await supertest(app).post("/users").send(user);
    const { status } = result;
    expect(status).toEqual(409);
  });
});

describe("POST /auth/sign-in", () => {
  it("should return status 422 for invalid body", async() => {
    const body = {};

    const result = await supertest(app).post("/auth/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(422);
  });

  it("should return status 200 when account is logged in sucessufully", async() => {
    await createUser();
    const user = generateUserBody();

    const result = await supertest(app).post("/auth/sign-in").send(user);
    const status = result.status;
    expect(status).toEqual(200);
  });

  it("should return status 401 when email or password does not match or exist", async() => {
    const user = generateUserBody();
    const body = { email: user.email, password: user.password };

    const result = await supertest(app).post("/auth/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(401);
  });
});

