import { rejects } from "assert";
import sqlRepo from "../models/Item";

class ItemSQLRepo implements IItemRepo {
  async getAllItems(): Promise<IItem[]> {
    return sqlRepo.findAll();
  }
  async addItem(item: IItem): Promise<void> {
    sqlRepo.create({
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      stock: item.stock,
    });
  }
  getItemById(id: number): Promise<IItem> {
    return sqlRepo.findByPk(id);
  }
  async deleteItem(id: number): Promise<void> {
    const itemFromDb = await sqlRepo.findByPk(id);
    if (itemFromDb) {
      return await itemFromDb.destroy();
    } else {
      return new Promise<void>((resolve, reject) => {
        reject();
      });
    }
  }
  async updateItem(item: IItem): Promise<void> {
    const itemFromDb = await sqlRepo.findByPk(item.id);
    if (itemFromDb) {
      const { name, description, image, stock, price } = item;
      itemFromDb.name = name;
      itemFromDb.description = description;
      itemFromDb.image = image;
      itemFromDb.stock = stock;
      itemFromDb.price = price;
    } else {
      return new Promise<void>((resolve, reject) => {
        reject();
      });
    }
  }
}

export default new ItemSQLRepo()

