import express from "express"
import dotenv from "dotenv"
import { Request, Response } from "express"
import logger from "./logger"
import ItemRouter from "./routes/item"


dotenv.config()
const port = 3001 || process.env.PORT

const app: express.Application = express()
app.use(express.json())
app.use("/item", ItemRouter)

app.listen(port)
