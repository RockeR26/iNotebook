import { useContext, useState } from "react";
import noteContext from "./noteContext";
import alertContext from "./alertContext";

const NoteState = (props) => {
  const Url = "http://localhost:4000/";
  const [notes, setNotes] = useState([]);
  const {showAlert}=useContext(alertContext);


  const getNotes = async () => {
    var myHeaders = {
      "auth-token": localStorage.getItem("token")
    }

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const res = await (await fetch(`${Url}api/notes/allnotes`, requestOptions)).json();
    setNotes(res);
  }




  const addNote = async ({title,content,category}) => {
    // setNotes(notes.concat(note));

    var myHeaders = {
      "auth-token": localStorage.getItem("token")
      , "Content-Type": "application/json"
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({title,content,category})
    }
    const res = (await fetch(`${Url}api/notes/addnote`, requestOptions));
    if(res.status===200){
      showAlert("Your note was added","success");
    }else{
      showAlert(res.statusText,"danger");
    }
     getNotes();
  }

  const deleteNote = async(id) => {
    var myHeaders = {
      "auth-token": localStorage.getItem("token")
      , "Content-Type": "application/json"
    }

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    const res = await fetch(`${Url}api/notes/deletenote/${id}`, requestOptions)
    if(res.status===200){
      showAlert("Your note was deleted","success");
    }else{
      showAlert(res.statusText,"danger");
    }
    getNotes();
  }

 const updateNote=async(note)=>{

  const newNote={title:note.etitle,content:note.econtent,category:note.ecategory}
  

  var myHeaders = {
    "auth-token": localStorage.getItem("token")
    , "Content-Type": "application/json"
  }

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body:JSON.stringify(newNote)
  }
  const res = (await fetch(`${Url}api/notes/editnote/${note._id}`, requestOptions));
  if(res.status===200){
    showAlert("Your note was Updated","success");
  }else{
    showAlert(res.statusText,"danger");
  }
   getNotes();
}
   



  return (
    <noteContext.Provider value={{ notes,addNote, deleteNote,getNotes,updateNote}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;