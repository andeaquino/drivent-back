import User from "../../src/entities/User";

export function generateUserBody() {
  const userData = { email: "oi@uol.com", password: "123456" };
  return userData;
}

export async function createUser() {
  const userData = generateUserBody();
  await User.createNew(userData.email, userData.password);
  return userData;
}
