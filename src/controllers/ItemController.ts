import { Request, Response } from "express";
import itemRepo from "../data/ItemMockRepo";
import { validationResult } from "express-validator";

class ItemController {
  itemRepo: IItemRepo;
  count: number;

  constructor(iRepo: IItemRepo) {
    this.count = 0;
    this.itemRepo = iRepo;
  }
  getAllItems = (req: Request, res: Response) => {
    res.send(itemRepo.getAllItems());
  };
  getItemById = (id: number) => {
    return itemRepo.getItemById(id);
  };
  createItem = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, image, price, stock } = req.body;
    const item: IItem = {
      image,
      description,
      name,
      price,
      stock,
      id: this.count,
    };
    this.count++;
    itemRepo.addItem(item);
    res.status(201).send(item);
  };
  deleteItemById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const item = itemRepo.getItemById(id);
    if (item) {
      itemRepo.deleteItem(id);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  };
  updateItem = (req: Request, res: Response) => {
    const { name, description, image, price, stock } = req.body;
    const itemFromRequest: IItem = {
      image,
      description,
      name,
      price,
      stock,
      id: parseInt(req.params.id, 10),
    };
    const itemFromRepo = itemRepo.getItemById(itemFromRequest.id);
    if (itemFromRepo) {
      itemRepo.updateItem(itemFromRequest);
      res.status(200).send(itemFromRequest);
    } else {
      res.status(404).send();
    }
  };
  // patchItem = (req: Request, res: Response) => {};
}

const controller = new ItemController(itemRepo);
export default controller;
