import express from "express";
import { createNote, getNotes, updateNotes, getNoteById, deleteNote } from "../controllers/noteController.js";

export const route = express.Router();

route.post("/addNotes",createNote);
route.get("/getNotes",getNotes);
route.put("/update/:id",updateNotes);
route.get("/note/:id",getNoteById);
route.delete("/delete/:id",deleteNote);
