declare namespace Express {
  interface Response {
    Item: import("../src/data/IItem").IItem;
  }
}
