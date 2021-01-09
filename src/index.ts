import express from "express";
import dotenv from "dotenv";
import createServer from "./server";
import "reflect-metadata";

import { createConnection } from "typeorm";

dotenv.config();
const port = 3002 || process.env.PORT;

const app = createServer();

(async () => {
  const conn = await createConnection();
  await conn.runMigrations();
  console.log("Database Initialized");
  app.listen(port);
  console.log(`Server listening on port ${port}`);
})();
