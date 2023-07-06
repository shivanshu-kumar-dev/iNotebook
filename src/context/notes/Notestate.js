import React, { useState } from "react";
import notecontext from "./notecontext";
//import Notes from "../../components/Notes";

const Notestate=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]
      const[notes,setNotes]=useState(notesInitial);
      //Get all notes  
      const getNote=async ()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        
        //client side
        const json=await response.json();
         
        setNotes(json);
      }
      //add a note  
      const addNote=async (title,description,tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const note=await response.json();
        setNotes(notes.concat(note));
      }
      //delete a note 
      const deleteNote=async(id)=>{
        const newNote=notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
        //api call to delete
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json= response.json();
         console.log(json);
      }
      //edit a note
      const editNote=async(id,title,description,tag)=>{
        //on the server side
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json= await response.json();
        console.log(json);
        let newNotes=JSON.parse(JSON.stringify(notes))
        //on the client side.
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return(
        <notecontext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </notecontext.Provider>
    )
}

export default Notestate;