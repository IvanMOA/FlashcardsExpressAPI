import { Router } from "express";
import express from "express"
import {Request, Response} from 'express'
import authenticateWithJWT from "../middleware/authenticateWithJWT"
const itemRouter : Router = express.Router()

import itemRepo from "../data/ItemMockRepo"
let count = 0


itemRouter.get("/", authenticateWithJWT, (req: Request, res: Response) => {
    res.send(itemRepo.getAllItems())
})

itemRouter.post("/", (req: Request, res: Response) => {
    const { name, price, stock, description, image} = req.body;
    const item : IItem = {id: count, name, price, stock, description, image}
    itemRepo.addItem(item)
    count++
    res.status(200).send(item)
})


export default itemRouter

