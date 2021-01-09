module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ivan",
  password: "example",
  database: "shop",
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migrations",
  },
};
