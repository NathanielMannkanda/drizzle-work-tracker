import { db } from "../db";
import { users } from "../db/schema";

const rows = await db.select().from(users);
console.log("users in database:", rows.length);

process.exit(0);