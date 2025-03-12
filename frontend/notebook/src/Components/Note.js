import React, { useContext,useEffect, useState} from 'react'
import Noteitem from './Noteitem'
import noteContext from '../Contexts/noteContext'
import Addnote from './Addnote';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Note = () => {
  let navigate=useNavigate();
  const {notes,addNote,deleteNote,getNotes,updateNote} = useContext(noteContext);
  const [enote,setEnote]=useState({_id:"",etitle:"",econtent:"",ecategory:""});
  useEffect(()=>{
    getNotes();
    if(localStorage.getItem("token")!==null){
      navigate("/")
    }else{
      navigate("/login")
    }

    // eslint-disable-next-line
  },[])

  const editNote=(note)=>{
     setEnote({_id:note._id,etitle:note.title,econtent:note.content,ecategory:note.category});
  }
  const handleChange=(e)=>{
    setEnote({_id:enote._id,[e.target.id]:e.target.value})
  }
  const handleClick=(e)=>{
    
    updateNote(enote);
    e.preventDefault();   
  }
  return (
    <>
      <Modal enote={enote}  handleChange={handleChange} handleClick={handleClick}/>
      <Addnote addNote={addNote}  />
      <div className='row mt-5'>
          <h2>Your Notes</h2>
          {notes.length===0&&<div className='container mx-3'><h6>No Notes to display</h6></div>}
        {notes.map((n) =>
          <Noteitem key={n._id} note={n} deleteNote={deleteNote} editNote={editNote}/>
        )}

      </div>

    </>
  )
}

export default Note
