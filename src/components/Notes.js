import React, { useContext, useEffect, useRef,useState } from 'react'
import notecontext from '../context/notes/notecontext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'
function Notes() {
  const context = useContext(notecontext)
  let history=useNavigate()
  const { notes, getNote,editNote } = context
  const ref = useRef(null)
  const refClose = useRef(null)
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNote()
    }else{
      history("/login")
    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const handelClick=(e)=>{
    console.log("udpading the note",note)
    // e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    //addNote(note.title,note.description,note.tag);
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  
  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
            </div>
          </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handelClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2> Your Notes</h2>
        <div className='container mx-2'>
        {notes.length===0 && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
