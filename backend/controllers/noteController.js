import NotesData from '../models/schema.js';

export const createNote = async (req, res, next) => {
    const note = await new NotesData(req.body);

    try {
        note.save().then((data) => {
            res.status(200).send({
                message: "Note Added Successfully",
                success: true,
                data,
            });
        });
    }
    catch (error) {
        next(error);
    }
};

export const getNotes = async (req, res, next) => {

    try {
        //find() to find in the array of the json object
        await NotesData.find().then((data) => {
            res.status(200).send({
                message: "Get data successfull",
                success: true,
                data,
            });
        });
    }
    catch (error) {
        next(error);
    }
};

export const updateNotes = async (req, res, next) => {

    try {
        if (!req.params?.id) {
            throw new Error('Note id is missing')
        }
        /*The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg,
        passing any options, and returns the found document (if any) to the callback.*/
        await NotesData.findByIdAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, description: req.body.description }
        ).then((data) => {
            res.status(200).send({
                message: "Note updated successfully",
                success: true,
                data,
            });
        });
    }
    catch (error) {
        next(error);
    }
}

export const getNoteById = async (req, res, next) => {
    try {
        if (!req.params?.id) {
            throw new Error('Note id is missing')
        }
        const data = await NotesData.findById(req.params.id);
        if (data) {
            res.status(200).send({
                success: true,
                message: "Fetched successfully",
                data,
            })
        }
    }
    catch (error) {
        next(error);
    }
};

export const deleteNote = (req, res, next) => {

    try {
        if (!req.params?.id) {
            throw new Error('Note id is missing')
        }
        //.params to access the whole json object 

            NotesData.findByIdAndDelete({ _id: req.params.id }).then(
                (data) => {
                    res.status(200).send({
                        message: "Note deleted Successfully",
                        success: true,
                        data,
                    });
                });
       
    }
    catch (error) {
        next(error);
    }
};
