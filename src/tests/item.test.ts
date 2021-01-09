import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import createServer from "../server";
import "reflect-metadata";

const app = createServer();

const createItem = (serverApp: Express.Application) => {
  return request(app).post("/item").send({
    description: "Test",
    name: "Test@test.com",
    stock: 2,
    image: "Test",
    price: 50,
  });
};

beforeEach(async (done) => {
  await createConnection();
  await getConnection().runMigrations();
  done();
});

afterEach(async (done) => {
  await getConnection().undoLastMigration();
  await getConnection().close();
  done();
});

describe("GET /item", () => {
  it("should get all items", (done) => {
    request(app)
      .get("/item")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /item/:id", () => {
  it("should get one item", (done) => {
    let mockItem = {
      description: "TestTestTest",
      name: "Test@test.com",
      stock: 2,
      image: "Test",
      price: 50,
    };
    request(app).post("/item").send(mockItem).expect(201);

    request(app).get("/item/1").set("Accept", "application/json").expect(200);

    request(app)
      .get("/item/99")
      .set("Accept", "application/json")
      .expect(404, done);
  });
});

describe("POST /item", () => {
  let mockItem = {
    description: "TestTestTest",
    name: "Test@test.com",
    stock: 2,
    image: "Test",
    price: 50,
  };
  it("should create an item correctly", (done) => {
    let niceItem = { ...mockItem };
    request(app).post("/item").send(niceItem).expect(201, done);
  });
  it("should not create an item if name is not valid", (done) => {
    let noNameItem = { ...mockItem };
    noNameItem.name = null;
    request(app).post("/item").send(noNameItem).expect(400);
    noNameItem.name = "";
    request(app).post("/item").send(noNameItem).expect(400);
    // @ts-ignore
    noNameItem.name = 1;
    request(app).post("/item").send(noNameItem).expect(400, done);
  });
  it("should not create an item if description is not valid", (done) => {
    let noDescItem = { ...mockItem };
    noDescItem.description = null;
    request(app).post("/item").send(noDescItem).expect(400);
    noDescItem.description = "";
    request(app).post("/item").send(noDescItem).expect(400);
    noDescItem.description = "123456789";
    request(app).post("/item").send(noDescItem).expect(400);
    // 300+ description length
    noDescItem.description =
      "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII";
    request(app).post("/item").send(noDescItem).expect(400);
    // @ts-ignore
    noDescItem.description = 1;
    request(app).post("/item").send(noDescItem).expect(400, done);
  });
  it("should not create an item if stock is not valid", (done) => {
    let noStockItem = { ...mockItem };
    noStockItem.stock = null;
    request(app).post("/item").send(noStockItem).expect(400);
    noStockItem.stock = -1;
    request(app).post("/item").send(noStockItem).expect(400);
    // @ts-ignore
    noStockItem.stock = "";
    request(app).post("/item").send(noStockItem).expect(400, done);
  });
  it("should not create an item if image is not valid", (done) => {
    let noImageItem = { ...mockItem };
    noImageItem.image = null;
    request(app).post("/item").send(noImageItem).expect(400);
    // @ts-ignore
    noImageItem.image = -1;
    request(app).post("/item").send(noImageItem).expect(400);
    // @ts-ignore
    noImageItem.image =
      "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII";
    request(app).post("/item").send(noImageItem).expect(400, done);
  });
  it("should not create an item if price is not valid", (done) => {
    let noPriceItem = { ...mockItem };
    noPriceItem.price = null;
    request(app).post("/item").send(noPriceItem).expect(400);
    noPriceItem.price = -1;
    request(app).post("/item").send(noPriceItem).expect(400);
    // @ts-ignore
    noPriceItem.price = "";
    request(app).post("/item").send(noPriceItem).expect(400, done);
  });
});
