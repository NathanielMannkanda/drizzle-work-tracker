import { pgTable, pgEnum, varchar, timestamp, uuid, text } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["superuser", "manager", "worker"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});