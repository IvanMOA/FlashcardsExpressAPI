import { Request, Response } from "express";
import itemRepo from "../data/ItemSQLRepo";
import { validationResult } from "express-validator";
import { IItem, IItemRepo } from "../data/IItem";

class ItemController {
  itemRepo: IItemRepo;

  constructor(iRepo: IItemRepo) {
    this.itemRepo = iRepo;
  }
  getAllItems = async (req: Request, res: Response) => {
    const items = await this.itemRepo.getAllItems();
    res.send(items);
  };
  getItemById = async (req: Request, res: Response) => {
    try {
      const itemFromDb = await itemRepo.getItemById(
        parseInt(req.params.id, 10)
      );
      if (!itemFromDb) {
        res.status(404).send();
      } else {
        res.status(200).send(itemFromDb);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  createItem = async (req: Request, res: Response) => {
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
    };
    const repoItem = await this.itemRepo.addItem(item);
    console.log(repoItem);
    res.status(201).send(repoItem);
  };
  deleteItemById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const item = await itemRepo.getItemById(id);
    if (item) {
      itemRepo.deleteItem(id);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  };
  updateItem = async (req: Request, res: Response) => {
    try {
      const { name, description, image, price, stock } = req.body;
      const itemFromRequest: IItem = {
        image,
        description,
        name,
        price,
        stock,
        id: parseInt(req.params.id, 10),
      };
      const itemFromRepo = await itemRepo.getItemById(itemFromRequest.id);
      if (itemFromRepo) {
        await itemRepo.updateItem(itemFromRequest);
        res.status(200).send(itemFromRequest);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  // patchItem = (req: Request, res: Response) => {};
}

const controller = new ItemController(itemRepo);
export default controller;
