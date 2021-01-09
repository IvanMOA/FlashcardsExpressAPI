import express from "express";
import dotenv from "dotenv";
import ItemRouter from "./routes/itemRouter";
import "reflect-metadata";

import { createConnection } from "typeorm";

dotenv.config();
const port = 3001 || process.env.PORT;

const app: express.Application = express();
app.use(express.json());
app.use("/item", ItemRouter);

(async () => {
  await createConnection();
  console.log("Database Initialized");
  app.listen(port);
  console.log(`Server listening on port ${port}`);
})();

console.log("This ran while exporting ?");

export default app;
