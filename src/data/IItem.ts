interface IItem {
    id: number,
    name: string,
    description: string,
    stock: number,
   price: string ,
   image: string,
}

interface IItemRepo {
    getAllItems() : IItem[]
    getItemById(id: number) : IItem
    addItem(item: IItem): void
    deleteItem(id: number) : void
    updateItem(item: IItem) : void
    patchItem(id : number, listOfPatches : ItemPropToPatch[] ) : void
}

type ItemPropToPatch = {
    field : "id" | "name" | "description" | "stock" | "price" | "image"
    value : number | string
}