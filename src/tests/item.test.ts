import request from "supertest";
import app from "../server";

const createItem = (serverApp: Express.Application) => {
  return request(serverApp).post("/item").send({
    description: "Test",
    name: "Test@test.com",
    stock: 2,
    image: "Test",
    price: 50,
  });
};

describe("GET /item", () => {
  it("should get all items", (done) => {
    request(app)
      .get("/item")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
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
    let niceItem = {...mockItem}
    request(app).post("/item").send(niceItem).expect(201).expect(mockItem, done);
  });
  it("should not create an item if name is not valid", (done) => {
    let noNameItem = {...mockItem}
    noNameItem.name = null
    request(app).post("/item").send(noNameItem).expect(400, done);
    noNameItem.name = ""
    request(app).post("/item").send(noNameItem).expect(400, done);
    // @ts-ignore
    noNameItem.name = 1
    request(app).post("/item").send(noNameItem).expect(400, done);
  });
});
