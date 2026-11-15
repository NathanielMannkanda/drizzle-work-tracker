import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { tasks } from "../db/schema";

export const createTaskSchema = createInsertSchema(tasks, {
  title: (schema) => schema.trim().min(1, "Title is required"),
  description: (schema) => schema.trim(),
}).pick({
  title: true,
  description: true,
  assignedTo: true,
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;