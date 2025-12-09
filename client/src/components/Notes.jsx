import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, setNotes, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else {
            navigate("/login");
        }
        //eslint-disable-next-line
    }, []);
    const [note, setNote] = useState({title: "", description: "", tag: "General"});
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currNote) => {
        ref.current.click();
        setNote(prev => ({
            ...prev,
            ...currNote
        }));
    }
    const closeModal = () => {
        editNote(note);
        refClose.current.click();
        props.showAlert("Note Updated.", "success");
    }
    const handleOnChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edit-title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edit-description" name="description" value={note.description} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="edit-tag" name="tag" value={note.tag} onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={closeModal}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 justify-content-center">
                <h2>Your Notes</h2>
                <div className="container">
                {notes.length===0 && "No Notes to display."}
                </div>
                {notes.toReversed().map(note => <NoteItem key={note._id} note={note} editNote={updateNote} showAlert={props.showAlert}/>)}
            </div>
        </>
    )
}
