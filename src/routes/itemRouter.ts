import express from "express";
import { Router } from "express";
import ItemController from "../controllers/ItemController";
import { body } from "express-validator";
// import authenticateWithJWT from "../middleware/authenticateWithJWT";
const itemRouter: Router = express.Router();

const isNotNeg = (x: number) => x >= 0;

// TODO : Should include error codes with a custom msg
const validateItem = [
  body("description")
    .isString()
    .isLength({ min: 10, max: 300 })
    .withMessage(
      "IC001:Description lenght must lay between 10 and 300 characters"
    ),
  body("stock").isNumeric().custom(isNotNeg),
  body("name").isString().isLength({ min: 0 }),
  body("image")
    .isString()
    .isLength({ min: 0, max: 300 })
    .withMessage("BR004:Field image cannot be of length 0"),
  body("price").isNumeric().custom(isNotNeg),
];

itemRouter.get("/", ItemController.getAllItems);

itemRouter.get("/:id", ItemController.getItemById);

itemRouter.post("/", ...validateItem, ItemController.createItem);

itemRouter.delete("/:id", ItemController.deleteItemById);

itemRouter.put("/:id", ...validateItem, ItemController.updateItem);

export default itemRouter;
