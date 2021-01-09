import express from "express";
import dotenv from "dotenv";
import createServer from "./server";
import "reflect-metadata";

import { createConnection } from "typeorm";

dotenv.config();
const port = 3001 || process.env.PORT;

const app = createServer();

(async () => {
  await createConnection();
  console.log("Database Initialized");
  app.listen(port);
  console.log(`Server listening on port ${port}`);
})();
