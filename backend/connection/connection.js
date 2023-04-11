import mongoose from "mongoose";
import {config} from "../config.js";

const link = `mongodb+srv://${config.name}:${config.password}@${config.cluster}.mongodb.net/?retryWrites=true&w=majority`;

export async function mongoConnect() {
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
