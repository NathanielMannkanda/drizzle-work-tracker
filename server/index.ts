import express from "express";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { env } from "./env";

const app = express();
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  await db.execute(sql`select 1`);
  res.json({ status: "ok" });
});

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
})