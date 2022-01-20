import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import supertest from "supertest";
import clearDatabase from "../utils/clearDatabase";
import createRows from "../factories/createRows";

describe ("GET /payment/plans", () => {
  beforeAll(async() => {
    await init();
    await createRows();
  });

  it("Sould return an object's array and status 200 if there is data on the database", async() => {
    const result = await supertest(app).get("/payment/plans");
    expect(result.status).toEqual(200);
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });
});
