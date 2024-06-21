import express from "express";
import bodyParser from "body-parser";
import Personrouter from "./routes/personRoutes.js"; 
import menuRouter from "./routes/menuRoutes.js";
import db from "./db.js";
import dotenv from 'dotenv';
import LoginRouter from './routes/LoginRouter.js'
import cors from 'cors'; 
import PostRouter from './routes/PostRouter.js'
import BookMarkRouter from './routes/BookMarkRouter.js'

dotenv.config({
    path: './env'
})

const port = 4000;

const app = express();

app.use(bodyParser.json({limit: '50mb'})) //req.bodybodyParser.json({limit: '50mb'})

app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome to home page")
});


app.use("/person",Personrouter)

app.use("/menu", menuRouter)

app.use("/login", LoginRouter)

app.use("/post", PostRouter)

app.use("/bookmark", BookMarkRouter)

app.listen(port, () => {
    console.log("server is running")
});

