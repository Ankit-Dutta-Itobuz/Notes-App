//express server
import express from "express";
import cors from 'cors';
import {route} from './routes/noteRoutes.js'
import { mongoConnect } from "./connection/connection.js";


const port = 4070;
const app = express();

//middleware important
app.use(express.json()); //for post in json
app.use(cors());//for cros origin

//api
app.use("/", route);

//creating server
app.listen(port, () => {
    console.log(`Listening to port:${port}.....`);
});

mongoConnect();