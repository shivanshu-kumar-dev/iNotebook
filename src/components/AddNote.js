import React, { useState,useContext } from 'react'
import notecontext from '../context/notes/notecontext'


function AddNote() {
  const context=useContext(notecontext)
  const {addNote}=context
  const[note,setNote]=useState({title:"",description:"",tag:""})
  const handelClick=(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  return (
      <div className='container my-3'>
        <h2>Add your Notes</h2>
        <div className='container my-3'>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
            </div>
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handelClick}>Add Notes</button>
          </form>
        </div>
      </div>
  )
}

export default AddNote
