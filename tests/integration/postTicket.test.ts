import app, { init } from "../../src/app";
import supertest from "supertest";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import createTicket from "../factories/createTicket";
import http from "../../src/enums/http.status";
import CreatedTicket from "../utils/CreatedTicket";
import CreatedEnrollment from "../utils/CreatedEnrollment";
import createEnrollment from "../factories/createEnrollment";
import CreatedTypes from "../utils/CreatedTypes";
import createTypes from "../factories/createTypes";

describe ("POST payment/payment", () => {
  let createdTicket: CreatedTicket;
  let types: CreatedTypes;
  let enrollment: CreatedEnrollment;  

  beforeAll(async() => {
    await init();
    await clearDatabase();
    types = await createTypes();
    enrollment = await createEnrollment();
  });

  afterEach(async() => {
    await clearDatabase();   
    createdTicket = await createTicket();
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });

  it("Should return status Created if valid token and enrolled user", async() => {
    const result = await supertest(app).post("/payment/ticket").send({
      hotelPlan: types.hotelPlan.id,
      presenceType: types.presenceType.id,
    }).set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(http.CREATED);
  });

  it("Should return status Conflict if the ticket has already been created", async() => {
    const result = await supertest(app).post("/payment/ticket").send({
      hotelPlan: createdTicket.ticket.hotelPlan.id,
      presenceType: createdTicket.ticket.presenceType.id,
    }).set("Authorization", `Bearer ${createdTicket.session.token}`);
    expect(result.status).toEqual(http.CONFLICT);
  });

  it("Should return status Unauthorized if invalid token", async() => {
    const result = await supertest(app).post("/payment/ticket").send({
      hotelPlan: createdTicket.ticket.hotelPlan.id,
      presenceType: createdTicket.ticket.presenceType.id,
    }).set("Authorization", "Bearer ");
    expect(result.status).toEqual(http.UNAUTHORIZED);
  });

  it("Should return Unprocessable entity if invalid body", async() => {
    const result = await supertest(app).post("/payment/ticket").send({
      hotelPlan: createdTicket.ticket.hotelPlan,
      presenceType: createdTicket.ticket.presenceType,
    }).set("Authorization", `Bearer ${createdTicket.session.token}`);
    expect(result.status).toEqual(http.UNPROCESSABLE_ENTITY);
  });
});
