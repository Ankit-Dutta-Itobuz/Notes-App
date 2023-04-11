//express server
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import {route} from './routes/noteRoutes.js'
// import NotesData from './models/schema.js';
import config from "./config.js";

const port = 8060;
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

//connecting to mongodb
const link = config.mongoUrl;

async function mongoConnect() {
    await mongoose
        .connect(link, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDb");
        })
        .catch((err) => {
            console.error(err);
        });
}

mongoConnect();