import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import supertest from "supertest";
import createEnrollment from "../factories/createEnrollment";

describe ("GET /payment/plans", () => {
  beforeAll(async() => {
    await init();
    await createEnrollment();
  });

  it("Sould return an object's array and status 200 if there is data on the database", async() => {
    const result = await supertest(app).get("/payment/plans");
    expect(result.status).toEqual(200);
  });

  afterAll(async() => {
    await getConnection().close();
  });
});
