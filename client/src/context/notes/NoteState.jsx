import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    let host = import.meta.env.VITE_API_URL;
    const [notes, setNotes] = useState([]);

    //get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/all-notes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        let json = await response.json();
        setNotes(json);
    }

    //adding new note
    const addNote = async ({title, description, tag}) => {
        const response = await fetch(`${host}/api/notes/new-note`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const newNote = await response.json();
        setNotes(prev=>[...prev, newNote]);
    }

    //edit an existing note
    const editNote = async ({_id, title, description, tag}) => {   
        const response = await fetch(`${host}/api/notes/edit-note/${_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        setNotes(prevNotes =>
            prevNotes.map(note => note._id === _id ? json : note));
    }

    //delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        if(!response.ok) {
            console.error("Delete failed:", response.statusText);
            return;
        }   
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    }
    return (
        <noteContext.Provider value={{ notes, setNotes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;