import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("shop", "ivan", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    min: 0,
    max: 5,
    idle: 30000,
  },
  logging: false,
});

export default sequelize;
