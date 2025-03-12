import { useState } from "react";



const Addnote = ({ addNote }) => {


    const [note, setNote] = useState({ title: "", content: "", category: "" })


    const handleClick = (e) => {
        addNote(note);
        setNote({ title: "", content: "", category: "" });
        e.preventDefault();
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    }


    return (

        <form onSubmit={handleClick}>
            <div className="mb-3">
                <label htmlFor="ttitle" className="form-label" >
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={handleChange}
                    value={note.title}
                    required
                    minLength={3}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Tag
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    value={note.category}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">
                    Content
                </label>
                <textarea
                    type="text"
                    className="form-control"
                    id="content"
                    onChange={handleChange}
                    value={note.content}
                    required
                    minLength={6}
                />
            </div>
            <button type="submit" className="btn btn-primary" >
                ADD
            </button>
        </form>
    )
}

export default Addnote
