class ItemMockRepo implements IItemRepo {
  items: IItem[];
  constructor() {
    this.items = [];
  }
  getAllItems(): IItem[] {
    return this.items;
  }
  getItemById(id: number): IItem {
    const item = this.items.find((repoItem) => repoItem.id === id);
    if (item != null) {
      return item;
    } else {
      return null;
    }
  }

  addItem(item: IItem): void {
    this.items.push(item);
  }
  deleteItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
  updateItem(item: IItem): void {
    const itemIndex = this.items.findIndex(
      (itemFromRepo) => itemFromRepo.id === item.id
    );
    this.items[itemIndex] = item;
  }
  // patchItem(id: number, listOfPatches: ItemPropToPatch[]): void {
  //   const itemIndex = this.items.findIndex(
  //     (itemFromRepo) => itemFromRepo.id === id
  //   );
  //   const itemToPatch: IItem = this.items[itemIndex];
  //   listOfPatches.forEach((patch) => {
  //     const itemKeys = Object.keys(itemToPatch);
  //     itemKeys.forEach((key) => {
  //       if (key === patch.field) {
  //         // @ts-ignore
  //         itemToPatch[key] = patch.value;
  //       }
  //     });
  //   });
  // }
}

export default new ItemMockRepo();
