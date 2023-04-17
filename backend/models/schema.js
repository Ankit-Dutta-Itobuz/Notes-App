import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  const NotesData = mongoose.model("NotesData", schema);
  
  export default NotesData;