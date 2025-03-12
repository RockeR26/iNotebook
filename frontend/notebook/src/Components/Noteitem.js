import React from 'react'

const Noteitem = ({note,deleteNote,editNote }) => {
    const handleClick=(e)=>{
        if(e.target.id==="trash")
        deleteNote(note._id);
        else
        editNote(note);
    }
    return (
        <div className='my-4 col-md-4'>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.category}</h6>
                    <p className="card-text">{note.content}</p>
                    <p className="card-subtitle mb-2 text-body-secondary">- {new Date(note.date).toUTCString()}</p>
                    <div className='container'>
                        <i className="fa-solid fa-trash mx-2" id="trash" onClick={handleClick}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" id="edit"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClick}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
