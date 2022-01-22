import { init } from "../../src/app";
import { getConnection } from "typeorm";
import clearDatabase from "../utils/clearDatabase";
import createTicket from "../factories/createTicket";
import Ticket from "../../src/entities/Ticket";

describe ("POST /payment", () => {
  let ticket: {
    ticket: Ticket,
    enrollment: any,
  };

  beforeAll(async() => {
    await init();
    await clearDatabase();
    ticket = await createTicket();
  });

  afterAll(async() => {
    await clearDatabase();
    await getConnection().close();
  });

  it("Sould return status Ok and an object if valid token and enrolled user", () => {
    expect(ticket).toEqual({
      ticket: expect.any(Object),
      enrollment: expect.any(Object)
    });
  });
});
