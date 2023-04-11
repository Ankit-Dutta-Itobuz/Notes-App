import NotesData from '../models/schema.js';

 export const  createNote = async (req, res) => {
    const note = await new NotesData(req.body);
    try {
        note.save().then((data) => {
            res.status(200).send({
                data,
                message: "Note Added Successfully",
                success: true,
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

export const getNotes = async (req, res) => {
    try {
        //find() to find in the array of the json object
        await NotesData.find({}).then((data) => {
            res.status(200).send({
                data,
                message: "Get data successfull",
                success: true,
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

export const updateNotes = async(req, res) => {
    try {
        /*The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg,
        passing any options, and returns the found document (if any) to the callback.*/
       await NotesData.findByIdAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, text: req.body.text }
        ).then((data) => {
            res.status(200).send({
                data,
                message: "Note updated successfully",
                success: true,
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
}

export const getNoteById =  async(req, res) => {
    try {
        const data = await NotesData.findById(req.params.id);
        if(data) {
            res.status(200).send({
                success: true,
                message: "fetched successfully",
                data,
            })
        }
    } catch(err) {
        res.status(400).send({
            message: "failed to get",
            success: false,
            data: null,
        });
    }
};

export const deleteNote = (req, res) => {
    try {
        //.params to access the whole json object 
        NotesData.findByIdAndDelete({ _id: req.params.id }).then(
            (data) => {
                res.status(200).send({
                    data,
                    message: "Note deleted Successfully",
                    success: true,
                });
            });
    } catch (err) {
        res.status(400).send(err);
    }
};