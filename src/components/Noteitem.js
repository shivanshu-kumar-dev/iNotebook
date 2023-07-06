import React,{ useContext } from 'react'
import notecontext from '../context/notes/notecontext'

function Noteitem(props) {
    const context=useContext(notecontext)
    const {deleteNote}=context
    const { note,updateNote } = props;
    //onClick={()=>{deleteNote(note._id)}}
    const deleteNotes = () => {
        deleteNote(note._id);
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={deleteNotes}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                        
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
