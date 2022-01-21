import console from "console";
import dotenv from "dotenv";

const path = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
console.log(path);

dotenv.config({ path });
