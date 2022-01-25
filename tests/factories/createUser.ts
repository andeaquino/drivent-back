import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import jwt from "jsonwebtoken";

export function generateUserBody() {
  const userData = { email: "oi@uol.com", password: "123456" };
  return userData;
}

export async function createUser() {
  const userData = await User.createNew("oi@uol.com", "123456");
  return userData;
}

export async function createAlternativeUser() {
  const userData = await User.createNew("oi@gmail.com", "123456");
  return userData;
}

export async function createSession(userId: number) {
  const token = jwt.sign({
    userId: userId
  }, process.env.JWT_SECRET);
      
  const session = await Session.create({ userId: userId, token }).save();
  return session;
}

