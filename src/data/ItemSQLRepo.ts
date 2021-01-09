import { getManager, getRepository } from "typeorm";
import { Item } from "../entity/Item";
import { IItem, IItemRepo } from "./IItem";

class ItemSQLRepo implements IItemRepo {
  async getAllItems(): Promise<IItem[]> {
    return getManager().find(Item);
  }
  async getItemById(id: number): Promise<IItem> {
    return getRepository(Item).findOne(id);
  }
  async addItem(item: IItem): Promise<IItem> {
    const user = getManager().create(Item, {
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      stock: item.stock,
    });
    const createdUser = await getManager().save(user);
    return createdUser;
  }
  async deleteItem(id: number): Promise<void> {
    await getManager().delete(Item, id);
  }
  async updateItem(item: IItem): Promise<void> {
    const { name, description, image, price, stock } = item;
    await getManager().update(Item, item.id, {
      name,
      description,
      image,
      price,
      stock,
    });
  }
}

export default new ItemSQLRepo();
