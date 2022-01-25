import app, { init } from "../../src/app";
import supertest from "supertest";
import createBooking from "../factories/createBooking";
import httpStatus from "http-status";
import clearDatabase from "../utils/clearDatabase";
import RoomInfos from "../../src/interfaces/roomInfos";
import { createAlternativeUser, createSession } from "../factories/createUser";
import Session from "../../src/entities/Session";
import { createRoom } from "../factories/createRoom";
import Room from "../../src/entities/Room";
import createTicket from "../factories/createTicket";
import TicketInfos from "../../src/interfaces/ticketInfos";

describe("GET /booking", () => {
  let infos: RoomInfos;
  let session: Session;

  beforeAll(async() => {
    await init();
    await clearDatabase();
  });

  beforeEach(async() => {
    await clearDatabase();
    const user = await createAlternativeUser();
    session = await createSession(user.id);
    infos = await createBooking();
  });

  it("should return UNAUTHORIZED to invalid payment info", async() => {
    const result = await supertest(app).get("/booking");
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return OK to a valid session", async() => {
    const result = await supertest(app)
      .get("/booking")
      .set("Authorization", `Bearer ${infos.ticket.session.token}`);
    expect(result.status).toEqual(httpStatus.OK);
  });

  it("should return FORBIDDEN to a user who has no ticket", async() => {
    const result = await supertest(app)
      .get("/booking")
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(httpStatus.FORBIDDEN);
  });
});

describe("POST /booking", () => {
  let ticketInfos: TicketInfos;
  let session: Session;
  let room: Room;

  beforeAll(async() => {
    await clearDatabase();
  });

  beforeEach(async() => {
    await clearDatabase();
    const user = await createAlternativeUser();
    session = await createSession(user.id);
    room = await createRoom();
    ticketInfos = await createTicket();
  });

  it("should return UNAUTHORIZED to invalid payment info", async() => {
    const result = await supertest(app).post("/booking");
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return OK to a valid session", async() => {
    const result = await supertest(app)
      .post("/booking")
      .set("Authorization", `Bearer ${ticketInfos.session.token}`).send({ userId: ticketInfos.user.id, roomId: room.id });
    expect(result.status).toEqual(httpStatus.OK);
  });

  it("should return FORBIDDEN to a user who has no ticket", async() => {
    const result = await supertest(app)
      .post("/booking")
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(httpStatus.FORBIDDEN);
  });
});
