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

describe("Item Endpoints", () => {
  it("should get one item after a new item is created", async () => {
    const res1 = await createItem(app);
    expect(res1.status).toEqual(201);
    const res = await request(app).get("/item").send();
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
  it("should be able to delete items", async () => {
    const res1 = await createItem(app);
    const res2 = await request(app).delete(`/item/${res1.body.id}`);
    const res3 = await request(app).delete(`/item/200`);
    expect(res2.status).toEqual(204);
    expect(res3.status).toEqual(404);
  });
  it("should be able to update items", async () => {
    const res1 = await createItem(app);
    const res2 = await request(app).put(`/item/${res1.body.id}`).send({
      description: "Item Updated",
      name: "Item updated",
      stock: 0,
      image: "ItemUpdated",
      price: 0,
    });
    const res3 = await request(app).put(`/item/200`);
    expect(res2.status).toEqual(200);
    expect(res2.body.name).toEqual("Item updated");
    expect(res3.status).toEqual(404);
  });
});
