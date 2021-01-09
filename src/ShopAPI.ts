export interface IItem {
  id?: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
}

export interface IItemRepo {
  getAllItems(): Promise<IItem[]>;
  getItemById(id: number): Promise<IItem>;
  addItem(item: IItem): Promise<IItem>;
  deleteItem(id: number): Promise<void>;
  updateItem(item: IItem): Promise<void>;
  // patchItem(id: number, listOfPatches: ItemPropToPatch[]): void;
}

export type ItemPropToPatch = {
  field: "id" | "name" | "description" | "stock" | "price" | "image";
  value: number | string;
};

//  Amazon Web Services (AWS)
export interface AWSIDToken {
  header: {
    kid: string;
    alg: string;
  };
  payload: {
    sub: string;
    aud: string;
    email_verified: string;
    token_use: string;
    auth_time: string;
    iss: string;
    "cognito:username": string;
    exp: string;
    given_name: string;
    iat: string;
    email: string;
  };
}
