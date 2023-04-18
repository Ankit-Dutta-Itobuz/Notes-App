//express server
import express from "express";
import cors from 'cors';
import {route} from './routes/noteRoutes.js'
import { mongoConnect } from "./connection/connection.js";
import {config} from "./config.js";

const port = config.port
const app = express();

//middleware important
app.use(express.json()); // It parses incoming JSON requests and puts the parsed data in req.body.
app.use(cors());//for cros origin

//connecting mongoDB
mongoConnect();

//api
app.use("/", route);
app.use(function(req, res, next){
    next(new Error("Page not found"));
});
app.use((error, request, response, next)=> {
    if(error){
        response.send({
            message: error.message,
            success: false,
            data: null,
        })
    }
})

//creating server
app.listen(port, () => {
    console.log(`Listening to port:${port}.....`);
});
