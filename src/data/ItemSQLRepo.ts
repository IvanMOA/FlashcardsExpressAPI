import { rejects } from "assert";
import Item from "../models/ItemModel";
import sqlRepo from "../models/ItemModel";

class ItemSQLRepo implements IItemRepo {
  async getAllItems(): Promise<IItem[]> {
    const items = await sqlRepo.findAll();
    return items;
  }
  async addItem(item: IItem): Promise<IItem> {
    const createdItem = await sqlRepo.create({
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      stock: item.stock,
    });
    return createdItem;
  }
  async getItemById(id: number): Promise<IItem> {
    const itemFromDb = await sqlRepo.findByPk(id);
    return itemFromDb;
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
    await Item.update(item, { returning: false, where: { id: item.id } });
  }
}

export default new ItemSQLRepo();
