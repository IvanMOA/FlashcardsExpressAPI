require('dotenv').config()

// Typescript must be compiled to js before running
// migrations from  TypeORM (npx typeorm migrations:run)
// and to run tests we need to point to the ts files

let entitiesPath = "dist/entity/**/*.js"
let migrationsPath = "dist/migrations/**/*.js"

if(process.env.NODE_ENV === 'TEST'){
  entitiesPath = "src/entity/**/*.ts"
  migrationsPath = "src/migrations/**/*.ts"
}

module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ivan",
  password: "example",
  database: "shop",
  logging: false,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "dist/migrations",
  },
};
