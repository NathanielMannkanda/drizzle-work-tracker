import { 
  pgTable, 
  pgEnum, 
  varchar, 
  timestamp, 
  uuid, 
  text,
  boolean, 
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["superuser", "manager", "worker"]);
export const taskStatusEnum = pgEnum("task_status", ["pending", "completed"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  assignedTo: uuid("assigned_to")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  status: taskStatusEnum("status").notNull().default("pending"),
  clearedByWorker: boolean("cleared_by_worker").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const workSessions = pgTable("work_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  clockIn: timestamp("clock_in", { withTimezone: true }).notNull().defaultNow(),
  clockOut: timestamp("clock_out", { withTimezone: true }),
},
  (table) => [
    uniqueIndex("one_active_session_per_user")
    .on(table.userId)
    .where(sql`${table.clockOut} is null`),
  ]
);