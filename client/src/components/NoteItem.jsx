import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
    const { note, editNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const handleDeleteNote = (_id) => {
        deleteNote(_id);
        props.showAlert("Note Deleted.", "success");
    }
    return (
        <div className="card col-md-3 my-2 mx-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title text-break">{note.title}</h5>
                    <div>
                        <i className="fa-regular fa-pen-to-square" onClick={() => {editNote(note)}}></i>
                        <i className="fa-regular fa-trash-can" onClick={() => {handleDeleteNote(note._id)}}></i>
                    </div>
                </div>
                <h6 className="card-subtitle mb-2 text-body-secondary small">{note.date?new Date(note.date).toISOString().split('T')[0]:console.log("no date")}.</h6>
                <p className="card-text text-break">{note.description}</p>
                <p className="card-link small text-muted">{note.tag}</p>
            </div>
        </div>
    )
}
