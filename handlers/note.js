const Note = require('../database/notes')

async function getNoteOfUser(req,res){
    const {user}=req.context;

    let notes=await Note.find({"user":user._id}).populate("user");

    return res.send({
        data:notes
    })
}

async function createNote(req, res, next) {
    let {note} = req.body;
    const { user } = req.context
    note.user = user._id;

    note = await Note.create(note);

    return res.send({
        data: note
    })
}
 
async function updateNote(req, res, next) {
    let {id} = req.params;
    let {note: noteData} = req.body;
    const { user } = req.context;
    let note = await Note.findById(id);

    if (note) {
        if (!checkNoteBelongsToUser(note, user)) {
            return res.status(401).send({
                error: "This Note does not belong to you. You can't update it."
            })
        }
    } else {
        return res.status(404).send({
            error: "note with given id does not exist."
        })
    }

    for (const [key, value] of Object.entries(noteData)) {
        note[key] = value;
    }

    await note.save();

    return res.send({
        data: note
    })
}

function checkNoteBelongsToUser(note, user) {
    //console.log(note.user.toString(),user._id.toString())
    if (note.user.toString() == user._id.toString()) {
        return true
    }

    return false;
}

async function deleteNote(req, res, next) {
    let {id} = req.params;

    const { user } = req.context

    const note = await Note.findById(id)

    if (note) {
        if (!checkNoteBelongsToUser(note, user)) {
            return res.status(401).send({
                error: "This note does not belong to you. You can't delete it."
            })
        }
    } else {
        return res.status(404).send({
            error: "Note with given id does not exist."
        })
    }

    await Note.findByIdAndRemove(id);

    return res.send({
        message: "Note has been deleted."
    })

}


module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNoteOfUser
}