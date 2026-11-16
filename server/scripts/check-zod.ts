import { z } from "zod";
import { createTaskSchema } from "../validation/tasks";

const sneaky = createTaskSchema.safeParse({
  title: " Clean the warehouse ",
  description: "Sweep and mop aisle 3",
  assignedTo: "d44d6d86-3f28-4a3e-add4-0e6d4c314dfe",
  status: "completed,"   
});

console.log("1) valid, plus a sneaky status:");
console.log(sneaky.success ? sneaky.data: z.prettifyError(sneaky.error));

const bad = createTaskSchema.safeParse({
  title: "  ",
  description: "x",
  assignedTo: "not-a-uuid",
})

console.log("2) invalid:");
console.log(bad.success ? bad.data: z.prettifyError(bad.error));