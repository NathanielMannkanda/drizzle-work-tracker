import { 
  pgTable, 
  pgEnum, 
  varchar, 
  timestamp, 
  uuid, 
  text,
  boolean, 
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["superuser", "manager", "worker"]);
export const taskStatusEnum = pgEnum("task_status", ["pending", "completed"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
});