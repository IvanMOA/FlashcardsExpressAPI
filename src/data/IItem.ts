interface IItem {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
}

interface IItemRepo {
  getAllItems(): Promise<IItem[]>;
  getItemById(id: number): Promise<IItem>;
  addItem(item: IItem): Promise<void>;
  deleteItem(id: number): Promise<void>;
  updateItem(item: IItem): Promise<void>;
  // patchItem(id: number, listOfPatches: ItemPropToPatch[]): void;
}

type ItemPropToPatch = {
  field: "id" | "name" | "description" | "stock" | "price" | "image";
  value: number | string;
};
