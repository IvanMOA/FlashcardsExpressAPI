import express from "express";
import { Router } from "express";
import ItemController from "../controllers/ItemController";
import { body } from "express-validator";
// import authenticateWithJWT from "../middleware/authenticateWithJWT";
const itemRouter: Router = express.Router();

const validateItem = [
  body("description").isString(),
  body("stock").isNumeric(),
  body("name").isString(),
  body("image").isString(),
  body("price").isNumeric(),
];

itemRouter.get("/", ItemController.getAllItems);

itemRouter.post("/", ...validateItem, ItemController.createItem);

itemRouter.delete("/:id", ItemController.deleteItemById);

itemRouter.put("/:id", ...validateItem, ItemController.updateItem);

export default itemRouter;
