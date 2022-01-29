import app, { init } from "../../src/app";
import supertest from "supertest";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import http from "../../src/enums/http.status";
import CreatedEnrollment from "../utils/CreatedEnrollment";
import createEnrollment from "../factories/createEnrollment";
import Session from "../../src/entities/Session";
import { createAlternativeUser, createSession, createUser } from "../factories/createUser";

describe ("POST /enrollments", () => {
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

  it("Sould return status Conflict if the user has already been enrolled", async() => {
    const result = await supertest(app).post("/enrollments").send({
      name: "Joãozinho",
      cpf: "186.272.727-25",
      birthday: "14/10/2000",
      address: {
        cep: "26000-000",
        street: "Rua dois",
        city: "new iguaçu",
        number: "89",
        state: "RJ",
        neighborhood: "Recreio",
        addressDetail: "",
      },
      phone: "(21) 96666-4444", 
    }).set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(http.CONFLICT);
  });

  it("Sould return status Created if valid token and not enrolled user", async() => {
    const result = await supertest(app).post("/enrollments").send({
      name: "Joãozinho",
      cpf: "123.456.789-10",
      birthday: "14/10/2000",
      address: {
        cep: "26000-000",
        street: "Rua dois",
        city: "new iguaçu",
        number: "89",
        state: "RJ",
        neighborhood: "Recreio",
        addressDetail: "",
      },
      phone: "(21) 96666-4444", 
    }).set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(http.CREATED);
  });

  it("Sould return status Unauthorized if invalid token", async() => {
    const result = await supertest(app).post("/enrollments").send({}).set("Authorization", `Bearer ${enrollment.session.token}`);
    expect(result.status).toEqual(http.UNAUTHORIZED);
  });

  it("Sould return Unprocessable entity if invalid body", async() => {
    const result = await supertest(app).post("/enrollments").send({
      name: "Joãozinho",
      cpf: "123.456.789-10",
      birthday: "14/10/2000",
      address: 1,
      phone: "", 
    }).set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(http.UNPROCESSABLE_ENTITY);
  });
});
