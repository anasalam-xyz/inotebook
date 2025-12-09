import noteContext from "../context/notes/noteContext"
import { useState, useContext } from "react"

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: "General"});
    const handleOnChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
    const handleAddNewNote = () => {
        addNote(note);
        setNote({title: "", description: "", tag: "General"});
        props.showAlert("New Note Added.", "success");
    }
    return (
        <div>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input required type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleOnChange}/>
                    <div id="titlehelp" className="form-text">Create your cloud note.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input required type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange}/>
                </div>
                <button disabled={note.title.length<3 || note.description.length<5} type="button" className="btn btn-primary" onClick={handleAddNewNote}>Add Note</button>
            </form>
        </div>
    )
}
